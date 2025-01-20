<?php

namespace App\Http\Controllers;

use App\Models\QuoteRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
        $validated = $request->validate([
           
            'source' => 'required|in:direct,quotation,tender', // Validate source dropdown
            'document' => 'nullable|file|mimes:pdf,doc,docx|max:2048', // File validation
        ]);

        if ($request->hasFile('document')) {
            $validated['document'] = $request->file('document')->store('documents', 'public');
        }

        QuoteRequest::create($validated);

        return redirect()->route('enquiry.index')->with('success', 'Enquiry request submitted successfully!');
    }

    // public function update(Request $request, $id)
    // {
    //     $validated = $request->validate([
    //         'name' => 'required|string|max:255',
    //         'email' => 'required|email',
    //         'contact' => 'required|string|max:20',
    //         'subject' => 'nullable|string|max:255',
    //         'message' => 'nullable|string',
    //         'source' => 'required|in:direct,quotation,tender', // Validate source dropdown
    //         'document' => 'nullable|file|mimes:pdf,doc,docx|max:2048', // File validation
    //     ]);

    //     $quote = QuoteRequest::findOrFail($id);

    //     if ($request->hasFile('document')) {
    //         $validated['document'] = $request->file('document')->store('documents', 'public');
    //     }

    //     $quote->update($validated);

    //     return redirect()->route('enquiry.index')->with('success', 'Enquiry request updated successfully!');
    // }

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
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'contact' => 'required|string|max:20',
            'subject' => 'nullable|string|max:255',
            'message' => 'nullable|string',
            'document' => 'nullable|file|mimes:pdf,doc,docx|max:2048', // Validate document file
            'source' => 'required|in:direct,quotation,tender', // Validate source dropdown
            'document' => 'nullable|file|mimes:pdf,doc,docx|max:2048', // File validation
        ]);

        $quote = QuoteRequest::findOrFail($id);

        if ($request->hasFile('document')) {
            $file = $request->file('document');
            $validated['document'] = $file->store('documents', 'public'); // Save to storage/app/public/documents
        }

        $quote->update($validated);

        return redirect()->route('enquiry.index')
            ->with('success', 'Enquiry request updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $quote = QuoteRequest::findOrFail($id);
        $quote->delete();

        return redirect()->route('enquiry.index')
            ->with('success', 'Enquiry request deleted successfully!');
    }
}
