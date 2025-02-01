<?php
namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Employee;
use Illuminate\Http\Request;
use App\Models\TravelAllowance;
use Illuminate\Support\Facades\Storage;

class TravelAllowanceController extends Controller
{
    public function index()
    {
        return Inertia::render('Allowances/TravelAllowances', [
            'travelAllowances' => TravelAllowance::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'employee_name' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'destination' => 'nullable|string|max:255',
            'travel_date' => 'required|date',
            'reason' => 'nullable|string',
            'document' => 'nullable|file|mimes:pdf,jpg,png|max:2048',
            'payment_by' => 'nullable|string|max:255',
            'payment_mode' => 'nullable|string|max:255',
            'extra_payment' => 'nullable|numeric|min:0',
        ]);
    
        $documentPath = null;
        if ($request->hasFile('document')) {
            $documentPath = $request->file('document')->store('travel_documents', 'public');
        }
    
        // Save the allowance to the database
        TravelAllowance::create([
            'employee_name' => $validated['employee_name'],
            'amount' => $validated['amount'] + ($validated['extra_payment'] ?? 0),  // Sum the amounts
            'destination' => $validated['destination'] ?? null,
            'travel_date' => $validated['travel_date'],
            'reason' => $validated['reason'] ?? null,
            'document_path' => $documentPath,
            'payment_by' => $validated['payment_by'] ?? null,
            'payment_mode' => $validated['payment_mode'] ?? null,
            'extra_payment' => $validated['extra_payment'] ?? 0,
        ]);
    
        return redirect()->route('travel-allowances.index')->with('success', 'Travel Allowance created successfully.');
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
