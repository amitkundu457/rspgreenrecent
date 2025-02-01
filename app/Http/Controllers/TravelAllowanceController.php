<?php
namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Employee;
use Illuminate\Http\Request;
use App\Models\TravelAllowance;
use App\Models\DocumentByEmployee;
use Illuminate\Support\Facades\Storage;

class TravelAllowanceController extends Controller
{
    public function index()
    {
        $allEmployees = Employee::join('users', 'employees.user_id', '=', 'users.id')
        ->join('designations', 'employees.designation_id', '=', 'designations.id')
        ->select('employees.*', 'users.name as employee_name', 'designations.name as designation_name')
        ->get();
        return Inertia::render('Allowances/TravelAllowances', [
            'travelAllowances' => TravelAllowance::all(),
            'allEmployees'=>  $allEmployees
        ]);
    }

    public function store(Request $request)
    {
    // dd();
        // Validate the incoming data
        $validated = $request->validate([
            'employee_name' => 'required|string|max:255', // Employee name is required
            'amount' => 'required|numeric|min:0',  // Amount is required
            'destination' => 'nullable|string|max:255', // Optional destination field
            'travel_date' => 'required|date', // Travel date is required
            'reason' => 'nullable|string', // Optional reason field
            'documents' => 'nullable|array', // Multiple file upload field
            'documents.*' => 'file|mimes:pdf,jpg,png,jpeg|max:2048', // Validate each document file
            'payment_by' => 'nullable|string|max:255', // Optional payment_by field
            'payment_mode' => 'nullable|string|max:255', // Optional payment_mode field
            'extra_payment' => 'nullable|numeric|min:0', // Optional extra payment
        ]);
    
        // Save the travel allowance to the database
        $travelAllowance = TravelAllowance::create([
            'employee_name' => $validated['employee_name'],
            'amount' => $validated['amount'] + ($validated['extra_payment'] ?? 0),
            'destination' => $validated['destination'] ?? null,
            'travel_date' => $validated['travel_date'],
            'reason' => $validated['reason'] ?? null,
            'payment_by' => $validated['payment_by'] ?? null,
            'payment_mode' => $validated['payment_mode'] ?? null,
            'extra_payment' => $validated['extra_payment'] ?? 0,
        ]);
    
       
        $employee = User::where('name', $validated['employee_name'])->first(); // Adjust this line as necessary
    
        if ($employee) {
            $employee_id = $employee->id; // Get the employee_id
        } else {
            // Handle case if employee doesn't exist
            return redirect()->back()->withErrors('Employee not found.');
        }
    
        // Handle document uploads and store them in the documents_byemployee table
        if ($request->hasFile('documents')) {
            foreach ($request->file('documents') as $document) {
                // Store the document with its original name
                $documentPath = $document->storeAs('travel_documents', $document->getClientOriginalName(), 'public');
    
                // Save each document to the documents_byemployee table
                DocumentByEmployee::create([
                    'employee_id' => $employee_id,  // Link the document to the employee
                    'document_name' => $document->getClientOriginalName(),
                    'document_path' => $documentPath,
                ]);
            }
        }
    
        // Redirect to the index route with a success message
        return redirect()->route('travel-allowances.index')->with('success', 'Travel Allowance and Documents created successfully.');
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
        return Inertia::render('Allowances/TravelRequest', [
            'travelAllowances' => TravelAllowance::all()->map(function ($ta) {
                return [
                    'id' => $ta->id,
                    'employee_name' => $ta->employee_name,
                    'amount' => $ta->amount,
                    'destination' => $ta->destination,
                    'travel_date' => $ta->travel_date,
                    'reason' => $ta->reason,
                    'payment_by' => $ta->payment_by,
                    'extra_payment' => $ta->extra_payment,
                    'document_path' => $ta->document_path,
                    'status' => $ta->status, // Approved, Rejected, or Pending
                ];
            }),
        ]);
    }
    public function showdoc($id)
    {
        $travelAllowance = TravelAllowance::find($id);
    
        if (!$travelAllowance) {
            return abort(404, 'Travel Allowance not found');
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
                'document_path' => $travelAllowance->document_path,
                'status' => $travelAllowance->status ?? 'Pending',
            ]
        ]);
    }
    
    




    public function updateStatus(Request $request, $id)
{
    $request->validate([
        'status' => 'required|in:approved,rejected',
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
