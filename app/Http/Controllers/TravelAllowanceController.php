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
            'allEmployees' =>  $allEmployees
        ]);
    }

    public function store(Request $request)
    {
        // Validate the request, including the file upload
        $request->validate([
            'employee_id' => 'required|exists:employees,id', // Assuming employees table exists
            'amount' => 'required|numeric',
            'destination' => 'required|string',
            'travel_date' => 'required|date',
            'reason' => 'required|string',
            'payment_by' => 'required|string',
            'extra_payment' => 'nullable|numeric',
            'status' => 'nullable|string',
            'document_name' => 'nullable|string',
            'document_path' => 'required|file|mimes:pdf,jpg,png,docx|max:10240', // Validation for file upload
        ]);

        // Store the travel allowance
        $TravelAllowance = TravelAllowance::create([
            'employee_id' => $request->employee_id,
            'amount' => $request->amount,
            'destination' => $request->destination,
            'travel_date' => $request->travel_date,
            'reason' => $request->reason,
            'payment_by' => $request->payment_by,
            'extra_payment' => $request->extra_payment,
            'status' => $request->status,
        ]);

        // Handle file upload and store it in the 'documents' folder
        if ($request->hasFile('document_path')) {
            $filePath = $request->file('document_path')->store('documents', 'public');
        }

        // Create the document record in the database
        $abc = DocumentByEmployee::create([
            'travel_allowance_id' => $TravelAllowance->id,
            'employee_id' => $TravelAllowance->employee_id,
            'document_name' => $request->document_name,
            'document_path' => $filePath ?? null, // Store the file path in the database
        ]);

        return back()->with('success', 'Travel allowance and document uploaded successfully');
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
        $travelAllowances = TravelAllowance::with('documentsByEmployee')->get()->map(function ($ta) {
            return [
                'id' => $ta->id,
                'employee_name' => $ta->employee_name,
                'amount' => $ta->amount,
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
