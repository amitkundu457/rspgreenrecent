<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Employee;
use Illuminate\Http\Request;
use App\Models\EmployeeExpense;
use App\Models\TravelAllowance;

use App\Models\DestinationAmount;
use App\Models\DocumentByEmployee;
use Illuminate\Support\Facades\DB;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;


class TravelAllowanceController
{
    public function index()
    {
        $allEmployees = Employee::join('users', 'employees.user_id', '=', 'users.id')
            ->join('designations', 'employees.designation_id', '=', 'designations.id')
            ->select('employees.*', 'users.name as employee_name', 'designations.name as designation_name')
            ->get();
        $us = Auth::user()->id;

        return Inertia::render('Allowances/TravelAllowances', [
            'travelAllowances' => TravelAllowance::all(),
            'allEmployees' =>  $allEmployees,
            'us' => $us,

        ]);
    }
    public function store(Request $request)
    {
        $allEmployees = Employee::join('users', 'employees.user_id', '=', 'users.id')
        ->join('designations', 'employees.designation_id', '=', 'designations.id')
        ->select('employees.*', 'users.name as employee_name', 'designations.name as designation_name')
        ->get();
        // dd($request->all());
        $user = Auth::user();
        if (!$user) {
            return back()->with('error', 'User not authenticated');
        }
    
        $employee_id = $request->employee_id ?: $user->id;
    
        if ($request->destination && $request->travel_date) {
            // ✅ Travel Allowance Logic
            $travelAllowance = TravelAllowance::create([
                'employee_id' => $employee_id,
                'amount' => $request->amount,
                'destination' => $request->destination,
                'travel_date' => $request->travel_date,
                'reason' => $request->reason,
                'payment_by' => $request->payment_by,
                'extra_payment' => $request->extra_payment,
                'status' => $request->status,
            ]);
    
            // ✅ Store DestinationAmount
            $destinationAmount = DestinationAmount::create([
                'amount' => $request->amount,
                'destination' => $request->destination,
                'destination_id' => $travelAllowance->id,
            ]);
    
            // ✅ Handle Travel Allowance Document Upload
            $filePath = null;
            if ($request->hasFile('document_path')) {
                $filePath = $request->file('document_path')->store('documents', 'public');
            }
    
            // ✅ Store DocumentByEmployee
            $document = DocumentByEmployee::create([
                'travel_allowance_id' => $travelAllowance->id,
                'employee_id' => $travelAllowance->employee_id,
                'document_name' => $request->document_name,
                'document_path' => $filePath,
            ]);
    
            return back()->with([
                'success' => 'Travel allowance and document uploaded successfully',
                'travel_allowance' => $travelAllowance,
                'destination_amount' => $destinationAmount,
                'document' => $document,
            ]);
        } else {
            // ✅ Employee Expense Logic
            $photoPath = null;
            if ($request->hasFile('expense_photo')) {
                $photoPath = $request->file('expense_photo')->store('expense_photos', 'public');
            }
    
            $expense = EmployeeExpense::create([
                'amount' => $request->amount,
                'reason' => $request->reason,
            ]);
    
            return back()->with([
                'success' => 'Employee travel expense stored successfully',
                'expense' => $expense,
            ]);
        }
    }
    
    
    
    





    public function update(Request $request, $id)
    {
        $travelAllowance = TravelAllowance::findOrFail($id);

        $validated = $request->validate([
            'employee_name' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'destination' => 'nullable|string|max:255', // Ensure this field can be nullable
            'travel_date' => 'required|date',
            'reason' => 'nullable|string',
            'document' => 'nullable|file|mimes:pdf,jpg,png|max:2048',
            'payment_by' => 'required|string|max:255',
            'payment_mode' => 'required|string|max:255',
            'extra_payment' => 'nullable|numeric|min:0',
        ]);

        if ($request->hasFile('document')) {
            if ($travelAllowance->document_path) {
                Storage::disk('public')->delete($travelAllowance->document_path);
            }
            $validated['document_path'] = $request->file('document')->store('travel_documents', 'public');
        }

        $travelAllowance->update($validated);

        return redirect()->route('travel-allowances.index')->with('success', 'Travel Allowance updated successfully.');
    }

    public function show()
    {

        $us = Auth::user()->id;
        $travelAllowances = TravelAllowance::with(['documentsByEmployee', 'destinationAmount'])->get()->map(function ($ta) {
            return [
                'id' => $ta->id,
                'employee_name' => $ta->employee_name,
                'amount' => optional($ta->destinationAmount)->amount, // Fetch amount from destination_amounts table
                'destination' => $ta->destination,
                'travel_date' => $ta->travel_date,
                'reason' => $ta->reason,
                'payment_by' => $ta->payment_by,
                'extra_payment' => $ta->extra_payment,
                'document_paths' => $ta->documentsByEmployee->pluck('file_path'),
                'status' => $ta->status,
            ];
        });

        // dd($travelAllowances);

        return Inertia::render('Allowances/TravelRequest', [
            'travelAllowances' => $travelAllowances,
            'us' => $us,
        ]);
    }



    public function showdoc($id)
    {
        $travelAllowance = TravelAllowance::find($id);

        if (!$travelAllowance) {
            return abort(404, 'Travel Allowance not found');
        }

        // Get all associated documents from the 'documents_byemployee' table for the employee
        $documents = DB::table('documents_byemployee')
            ->where('employee_id', $travelAllowance->employee_id)  // Use employee_id to fetch all documents for this employee
            ->get();

        if ($documents->isEmpty()) {
            return abort(404, 'No documents found for this employee');
        }

        // Get any existing travel allowance with the same ID and add the extra payment
        $existingAllowance = TravelAllowance::where('id', $id)->first();
        if ($existingAllowance) {
            $existingAllowance->extra_payment += $travelAllowance->extra_payment;
            $existingAllowance->save();
        }

        return Inertia::render('Allowances/Travelview', [
            'travelAllowance' => [
                'id' => $travelAllowance->id,
                'employee_name' => $travelAllowance->employee_name,
                'amount' => $travelAllowance->amount,
                'destination' => $travelAllowance->destination,
                'travel_date' => $travelAllowance->travel_date,
                'reason' => $travelAllowance->reason,
                'payment_by' => $travelAllowance->payment_by,
                'extra_payment' => $existingAllowance ? $existingAllowance->extra_payment : $travelAllowance->extra_payment,
                'documents' => $documents, // Pass all documents for the employee
                'status' => $travelAllowance->status ?? 'Pending',
            ]
        ]);
    }








    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required',
        ]);

        $travelAllowance = TravelAllowance::findOrFail($id);
        $travelAllowance->status = $request->status;
        $travelAllowance->save();

        return response()->json(['message' => 'Status updated successfully']);
    }


    public function destroy($id)
    {
        $travelAllowance = TravelAllowance::findOrFail($id);

        if ($travelAllowance->document_path) {
            Storage::disk('public')->delete($travelAllowance->document_path);
        }

        $travelAllowance->delete();

        return redirect()->route('travel-allowances.index')->with('success', 'Travel Allowance deleted successfully.');
    }
}
