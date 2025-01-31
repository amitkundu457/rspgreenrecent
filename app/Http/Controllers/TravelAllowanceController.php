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
        $allEmployees = Employee::join('users', 'employees.user_id', '=', 'users.id')
            ->join('designations', 'employees.designation_id', '=', 'designations.id') // join the designations table
            ->select('employees.*', 'users.name as employee_name', 'designations.name as designation_name') // select designation name
            ->get();
        $validated = $request->validate([
            'employee_name' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'destination' => 'required|string|max:255',
            'travel_date' => 'required|date',
            'reason' => 'nullable|string',
            'document' => 'nullable|file|mimes:pdf,jpg,png|max:2048',
            ''
        ]);

        $documentPath = null;
        if ($request->hasFile('document')) {
            $documentPath = $request->file('document')->store('travel_documents', 'public');
        }

        TravelAllowance::create([
            'employee_name' => $validated['employee_name'],
            'amount' => $validated['amount'],
            'destination' => $validated['destination'],
            'travel_date' => $validated['travel_date'],
            'reason' => $validated['reason'] ?? null,
            'document_path' => $documentPath,
        ]);

        return redirect()->route('travel-allowances.index')->with('success', 'Travel Allowance created successfully.');
    }

    public function update(Request $request, $id)
    {
        $travelAllowance = TravelAllowance::findOrFail($id);

        $validated = $request->validate([
            'employee_name' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'destination' => 'required|string|max:255',
            'travel_date' => 'required|date',
            'reason' => 'nullable|string',
            'document' => 'nullable|file|mimes:pdf,jpg,png|max:2048',
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
