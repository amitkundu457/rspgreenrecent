<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Employee;
use Illuminate\Http\Request;
use App\Models\FoodAllowance;
use Illuminate\Support\Facades\Storage;

class FoodAllowanceController extends Controller
{
    // Render Inertia page
    public function index()
    {
        $allEmployees = Employee::join('users', 'employees.user_id', '=', 'users.id')
            ->join('designations', 'employees.designation_id', '=', 'designations.id')
            ->select('employees.*', 'users.name as employee_name', 'designations.name as designation_name')
            ->get();

        // Get all food allowances and dump them
        $foodAllowances = FoodAllowance::all();
        // dd($foodAllowances);

        return Inertia::render('Allowances/FoodAllowances', [
            'foodAllowances' => $foodAllowances,
            'allEmployees' => $allEmployees,
        ]);
    }


    // Store a new food allowance
    public function store(Request $request)
    {
        $validated = $request->validate([
            'employee_name' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'food_date' => 'required|date',
            'reason' => 'nullable|string',
            'document' => 'nullable|file|mimes:pdf,jpg,png|max:2048',
        ]);

        $documentPath = $request->hasFile('document')
            ? $request->file('document')->store('food_documents', 'public')
            : null;

        FoodAllowance::create([
            'employee_name' => $validated['employee_name'],
            'amount' => $validated['amount'],
            'food_date' => $validated['food_date'],
            'reason' => $validated['reason'] ?? null,
            'document_path' => $documentPath,
        ]);

        return redirect()->back();
    }

    // Update an existing food allowance
    public function update(Request $request, $id)
    {
        $foodAllowance = FoodAllowance::findOrFail($id);

        $validated = $request->validate([
            'employee_name' => 'nullable|string|max:255',
            'amount' => 'nullable|numeric|min:0',
            'food_date' => 'nullable|date',
            'reason' => 'nullable|string',
            'document' => 'nullable|file|mimes:pdf,jpg,png|max:2048',
        ]);

        if ($request->hasFile('document')) {
            if ($foodAllowance->document_path) {
                Storage::disk('public')->delete($foodAllowance->document_path);
            }
            $validated['document_path'] = $request->file('document')->store('food_documents', 'public');
        }

        $foodAllowance->update($validated);

        return redirect()->back();
    }

    // Show food allowance details (destination field removed)
    public function show(Request $request)
    {
        // Remove references to 'destination' as it's no longer needed
        // $foodAllowances = FoodAllowance::with('documentsByEmployeeFood')->get()->map(function ($fa) {
        //     return [
        //         'id' => $fa->id,
        //         'employee_name' => $fa->employee_name,
        //         'amount' => $fa->amount,
        //         'food_date' => $fa->food_date,
        //         'reason' => $fa->reason,
        //         'document_paths' => $fa->documentsByEmployeeFood->pluck('file_path'),
        //         'status' => $fa->status,
        //     ];
        // });

        return Inertia::render('Allowances/FoodRequest', [
            // 'foodAllowances' => $foodAllowances,
        ]);
    }

    // Delete a food allowance
    public function destroy($id)
    {
        $foodAllowance = FoodAllowance::findOrFail($id);

        if ($foodAllowance->document_path) {
            Storage::disk('public')->delete($foodAllowance->document_path);
        }

        $foodAllowance->delete();

        return redirect()->back();
    }
}
