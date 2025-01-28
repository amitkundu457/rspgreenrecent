<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Advanceloan;
use Illuminate\Http\Request;

class AdvanceloanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $advanceloans = Advanceloan::all();
        $employees = User::join('employees', 'employees.user_id', '=', 'users.id')
            ->select('users.name', 'users.id','employees.basic_salary','employees.employee_id')->get();
            // dd($employees);

        return Inertia::render('adv/index', [
            'advanceloans' => $advanceloans,
            'employees'=> $employees
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            // 'borrower_name' => 'required|string|max:255',
            'loan_amount' => 'required|numeric',
            'remarks' => 'nullable|string',
        ]);

        Advanceloan::create($validated);

        return back()->with('success', 'Advance Loan created successfully.');

    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $advanceloan = Advanceloan::findOrFail($id);

        // Return a detailed view for a single record
        return Inertia::render('adv/index', [
            'advanceloan' => $advanceloan,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $advanceloan = Advanceloan::findOrFail($id);

        $validated = $request->validate([
            // 'borrower_name' => 'required|string|max:255',
            'loan_amount' => 'required|numeric',
            'remarks' => 'nullable|string',
        ]);

        $advanceloan->update($validated);

        // Redirect back to the index page
        return redirect()->route('adv.index')->with('success', 'Advance Loan updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        Advanceloan::destroy($id);

        // Redirect back to the index page
        return redirect()->route('adv.index')->with('success', 'Advance Loan deleted successfully.');
    }
}
