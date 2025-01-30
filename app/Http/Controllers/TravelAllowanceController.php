<?php

namespace App\Http\Controllers;

use App\Models\TravelAllowance;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TravelAllowanceController extends Controller
{
    /**
     * Display a listing of the travel allowances.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Fetch all travel allowances from the database
        $allowances = TravelAllowance::all();

        // Return the data to the React frontend using Inertia
        return Inertia::render('TravelAllowance/Index', [
            'allowances' => $allowances
        ]);
    }

    /**
     * Store a newly created travel allowance.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Validate the incoming request
        $request->validate([
            'employee_name' => 'required|string',
            'amount' => 'required|numeric',
            'destination' => 'required|string',
            'travel_date' => 'required|date',
            'reason' => 'required|string',
            'document' => 'nullable|file|mimes:pdf,jpg,png',
        ]);

        // Handle file upload
        if ($request->hasFile('document')) {
            $file = $request->file('document');
            $documentPath = $file->store('travel_documents');
        }

        // Create the travel allowance entry
        $allowance = TravelAllowance::create([
            'employee_name' => $request->employee_name,
            'amount' => $request->amount,
            'destination' => $request->destination,
            'travel_date' => $request->travel_date,
            'reason' => $request->reason,
            'document_path' => $documentPath ?? '',
        ]);

        // Redirect back to the index page
        return redirect()->route('allowances.index');
    }

    /**
     * Show the form for editing the specified travel allowance.
     *
     * @param \App\Models\TravelAllowance $travelAllowance
     * @return \Illuminate\Http\Response
     */
    public function edit(TravelAllowance $travelAllowance)
    {
        // Return the edit view with the allowance data
        return Inertia::render('TravelAllowance/Edit', [
            'allowance' => $travelAllowance
        ]);
    }

    /**
     * Update the specified travel allowance.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\TravelAllowance $travelAllowance
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, TravelAllowance $travelAllowance)
    {
        // Validate the incoming request
        $request->validate([
            'employee_name' => 'required|string',
            'amount' => 'required|numeric',
            'destination' => 'required|string',
            'travel_date' => 'required|date',
            'reason' => 'required|string',
            'document' => 'nullable|file|mimes:pdf,jpg,png',
        ]);

        // Handle file upload for updates
        if ($request->hasFile('document')) {
            // Delete the old file if it exists
            if ($travelAllowance->document_path) {
                Storage::delete($travelAllowance->document_path);
            }

            // Store the new file
            $file = $request->file('document');
            $documentPath = $file->store('travel_documents');
        }

        // Update the travel allowance entry
        $travelAllowance->update([
            'employee_name' => $request->employee_name,
            'amount' => $request->amount,
            'destination' => $request->destination,
            'travel_date' => $request->travel_date,
            'reason' => $request->reason,
            'document_path' => $documentPath ?? $travelAllowance->document_path, // Retain old document path if no new file uploaded
        ]);

        // Redirect back to the index page
        return redirect()->route('allowances.index');
    }

    /**
     * Remove the specified travel allowance from storage.
     *
     * @param \App\Models\TravelAllowance $travelAllowance
     * @return \Illuminate\Http\Response
     */
    public function destroy(TravelAllowance $travelAllowance)
    {
        // Delete the document file if it exists
        if ($travelAllowance->document_path) {
            Storage::delete($travelAllowance->document_path);
        }

        // Delete the travel allowance record
        $travelAllowance->delete();

        // Redirect back to the index page
        return redirect()->route('allowances.index');
    }
}
