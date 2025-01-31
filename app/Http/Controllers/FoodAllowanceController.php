<?php

namespace App\Http\Controllers;

use App\Models\FoodAllowance;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class FoodAllowanceController extends Controller
{
    // Render Inertia page
    public function index()
    {
        return Inertia::render('Allowances/FoodAllowances', [
            'foodAllowances' => FoodAllowance::all()
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
