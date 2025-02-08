<?php

namespace App\Http\Controllers;

use App\Models\QuoteRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class QuoteRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $quotes = QuoteRequest::latest()->get();
        return Inertia::render('enquiry/index', [
            'quotes' => $quotes,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('enquiry/index');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Log::info('Received Quote Request:', $request->all());

        // Convert source to lowercase
        $request->merge(['source' => strtolower($request->input('source'))]);

        try {
            // Validate input
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email',
                'contact' => 'required|string|max:20',
                'subject' => 'nullable|string|max:255',
                'message' => 'nullable|string',
                'source' => 'required|in:direct,quotation,tender',
                'lastdate' => $request->input('source') === 'tender' ? 'required|date' : 'nullable|date',
                'document' => 'nullable|file|mimes:pdf,doc,docx|max:2048',
            ]);

            Log::info('Validation passed', $validated);

            // Handle file upload
            if ($request->hasFile('document')) {
                $validated['document'] = $request->file('document')->store('documents', 'public');
            }

            // Insert into database
            $quote = QuoteRequest::create($validated);

            Log::info('Quote request stored successfully', ['id' => $quote->id]);

            return redirect()->route('enquiry.index')->with('success', 'Enquiry request submitted successfully!');
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('Validation Error: ' . json_encode($e->errors()));

            return redirect()->back()->withErrors($e->errors())->withInput();
        } catch (\Exception $e) {
            Log::error('Error storing quote request: ' . $e->getMessage());

            return redirect()->back()->with('error', 'Something went wrong. Please try again.');
        }
    }


    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $quote = QuoteRequest::findOrFail($id);
        return Inertia::render('enquiry/index', [
            'quote' => $quote,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $quote = QuoteRequest::findOrFail($id);
        return Inertia::render('enquiry/index', [
            'quote' => $quote,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email',
                'contact' => 'required|string|max:20',
                'subject' => 'nullable|string|max:255',
                'message' => 'nullable|string',
                'source' => 'required|in:direct,quotation,tender',
                'document' => 'nullable|file|mimes:pdf,doc,docx|max:2048',
            ]);

            $quote = QuoteRequest::findOrFail($id);

            // Handle file upload
            if ($request->hasFile('document')) {
                $validated['document'] = $request->file('document')->store('documents', 'public');
            }

            $quote->update($validated);

            return redirect()->route('enquiry.index')->with('success', 'Enquiry request updated successfully!');
        } catch (\Exception $e) {
            Log::error('Error updating quote request: ' . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $quote = QuoteRequest::findOrFail($id);
            $quote->delete();

            return redirect()->route('enquiry.index')->with('success', 'Enquiry request deleted successfully!');
        } catch (\Exception $e) {
            Log::error('Error deleting quote request: ' . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
