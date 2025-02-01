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
        // Validate the incoming data
        $validated = $request->validate([
            'employee_name' => 'required|string|max:255|not_in:null',
            'amount' => 'required|numeric|min:0',
            'destination' => 'nullable|string|max:255',
            'travel_date' => 'required|date',
            'reason' => 'nullable|string',
            'documents' => 'nullable|array',
            'documents.*' => 'file|mimes:pdf,jpg,png,jpeg|max:2048',
            'payment_by' => 'nullable|string|max:255',
            'payment_mode' => 'nullable|string|max:255',
            'extra_payment' => 'nullable|numeric|min:0',
        ]);
    
        // Check if employee exists
        $employee = User::whereRaw('LOWER(name) = ?', [strtolower(trim($validated['employee_name']))])->first();
    
        if (!$employee) {
            return response()->json(['error' => 'Employee not found'], 404);
        }
    
        // Get the extra payment value, if any
        $extraPayment = $validated['extra_payment'] ?? 0;
    
        // Check if there is an existing travel allowance entry for the employee
        $existingTravelAllowances = TravelAllowance::where('employee_id', $employee->id)->get();
    
        // Sum the existing extra payments
        $existingExtraPayment = $existingTravelAllowances->sum('extra_payment');
    
        // Add the new extra payment to the sum of the existing extra payments
        $totalExtraPayment = $existingExtraPayment + $extraPayment;
    
        // Create a new travel allowance entry
        $travelAllowance = TravelAllowance::create([
            'employee_id' => $employee->id,
            'employee_name' => $validated['employee_name'],
            'amount' => $validated['amount'],  // Base amount remains the same
            'destination' => $validated['destination'] ?? null,
            'travel_date' => $validated['travel_date'],
            'reason' => $validated['reason'] ?? null,
            'payment_by' => $validated['payment_by'] ?? null,
            'payment_mode' => $validated['payment_mode'] ?? null,
            'extra_payment' => $totalExtraPayment,  // Store the accumulated extra payment
        ]);
    
        // Handle document uploads if any
        if ($request->hasFile('documents')) {
            $uploadedFiles = [];
            foreach ($request->file('documents') as $document) {
                // Store the document in 'public/travel_documents'
                $documentPath = $document->storeAs('travel_documents', $document->getClientOriginalName(), 'public');
    
                // Save document details in the documents_byemployee table
                $savedDocument = DocumentByEmployee::create([
                    'employee_id' => $employee->id,
                    'document_name' => $document->getClientOriginalName(),
                    'document_path' => $documentPath,
                ]);
    
                // Check if the document was saved successfully
                if ($savedDocument) {
                    $uploadedFiles[] = [
                        'document_name' => $document->getClientOriginalName(),
                        'document_path' => $documentPath,
                        'saved' => true
                    ];
                } else {
                    $uploadedFiles[] = [
                        'document_name' => $document->getClientOriginalName(),
                        'document_path' => $documentPath,
                        'saved' => false
                    ];
                }
            }
    
            // Return response with uploaded files info
            return response()->json([
                'message' => 'Documents uploaded successfully',
                'uploaded_files' => $uploadedFiles
            ]);
        }
    
        // Return response for travel allowance creation
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
