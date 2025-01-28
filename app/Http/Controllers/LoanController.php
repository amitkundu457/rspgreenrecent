<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Loan;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoanController extends Controller
{
    /**
     * Display a listing of all loans.
     */
    public function index()
    {
        $us = Auth::user()->id;

        $loans = Loan::with('user')->get();

        return Inertia::render('Loan/index', [
            'loans' => $loans,
            'us' => $us
        ]);
    }


    public function store(Request $request)
    {
        // dd(Auth::user());
        // Validate the request data
        $validatedData = $request->validate([
            'registration' => 'required|string|max:255',
            'amount' => 'required',
            'reason' => 'required|string',
            'repayment_terms' => 'required',
            'duration_months' => 'nullable',
            'start_date' => 'required',
            'end_date' => 'required',
            'document' => 'nullable|file|mimes:pdf,jpg,png|max:2048',
        ]);

        // Handle document upload
        $documentPath = null;
        if ($request->hasFile('document')) {
            $documentPath = $request->file('document')->store('documents', 'public');
        }

        // Format dates using Carbon
        $startDate = Carbon::parse($request->start_date)->format('Y-m-d');
        $endDate = Carbon::parse($request->end_date)->format('Y-m-d');

        // Create a new loan entry with the authenticated user's name
        Loan::create([
            'employee_name' => Auth::user()->name,
            'registration' => $request->registration,
            'amount' => $request->amount,
            'reason' => $request->reason,
            'repayment_terms' => $request->repayment_terms,
            'duration_months' => $request->duration_months,
            'start_date' => $startDate,
            'end_date' => $endDate,
            'document' => $documentPath,
        ]);

        // Fetch the updated list of loans
        $loans = Loan::all();

        return Inertia::render('Loan/index', [
            'loans' => $loans,
        ]);
    }

    /**
     * Update a specific loan.
     */
    public function update(Request $request, $id)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'status' => 'required', // Validate status as one of the ENUM values
        ]);

        // Find the loan by ID
        $loan = Loan::find($id);

        if (!$loan) {
            return response()->json(['message' => 'Loan not found'], 404);
        }

        // Handle document upload if provided
        if ($request->hasFile('document')) {
            // Remove old document if it exists
            if ($loan->document && \Storage::exists('public/' . $loan->document)) {
                \Storage::delete('public/' . $loan->document);
            }

            // Store the new document
            $documentPath = $request->file('document')->store('documents', 'public');
            $loan->document = $documentPath;
        }

        // Update loan status and other fields
        $loan->update([
            // 'employee_name' => auth()->user()->name, // Get the authenticated user's name
            'status' => $request->status, // Update status
            // 'amount' => $request->amount, // Ensure amount is updated if needed
            // 'reason' => $request->reason,
            // 'repayment_terms' => $request->repayment_terms,
            // 'duration_months' => $request->repayment_terms === 'monthly' ? $request->duration_months : null,
            // 'start_date' => Carbon::parse($request->start_date)->format('Y-m-d'),
            // 'end_date' => Carbon::parse($request->end_date)->format('Y-m-d'),
        ]);

        // Fetch the updated list of loans
        return Inertia::render('Loan/index', [
            'loans' => Loan::all(),
        ]);
    }



    /**
     * Remove a specific loan from the database.
     */
    public function destroy($id)
    {
        // Find the loan by ID
        $loan = Loan::find($id);

        if (!$loan) {
            return response()->json(['message' => 'Loan not found'], 404);
        }

        // Remove the document file if it exists
        if ($loan->document && \Storage::exists('public/' . $loan->document)) {
            \Storage::delete('public/' . $loan->document);
        }

        // Delete the loan
        $loan->delete();

        // Fetch the updated list of loans
        return Inertia::render('Loan/index', [
            'loans' => Loan::all(),
        ]);
    }
    public function show(Request $request, $id)
    {
        // Fetch the loan by ID along with the related user (if needed)
        $loan = Loan::with('user')->findOrFail($id);
    
        return Inertia::render('Loan/show', [
            'loan' => $loan, // Pass the loan details to the view
        ]);
    }
    

}
