<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\clientWO;
use Inertia\Inertia;

class ClientWorkOrderController extends Controller
{
    /**
     * Display a listing of the clients.
     */
    public function index()
    {
        $clients = clientWO::all();
        return Inertia::render('clientWork/index', [
            'clients' => $clients,
        ]);
    }

    /**
     * Store a newly created client in the database.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'client_name' => 'required',
            'client_address' => 'required',
            'client_phone_no' => 'required',
            'client_work_order' => 'required',
            'work_order_date' => 'required',
            'document' => 'nullable', // Only document file validation
        ]);

        // Store the document if provided
        if ($request->hasFile('document')) {
            $validated['document'] = $request->file('document')->store('work_order_documents', 'public');
        }

        clientWO::create($validated);

        return redirect()->route('clientWork/index')->with('success', 'Client Work Order created successfully.');
    }

    /**
     * Remove the specified client from the database.
     */
    public function destroy($id)
    {
        $client = clientWO::find($id);

        if (!$client) {
            return back()->with('error', 'Client Work Order not found.');
        }

        // Delete the associated document if it exists
        if ($client->document) {
            \Storage::delete('public/' . $client->document);
        }

        $client->delete();

        return back()->with('success', 'Client Work Order deleted successfully.');
    }

    /**
     * Show the form for editing the specified client.
     */
    public function edit($id)
    {
        $client = clientWO::find($id);

        if (!$client) {
            return back()->with('error', 'Client Work Order not found.');
        }

        return Inertia::render('clientWork/index', [
            'client' => $client,
        ]);
    }

    /**
     * Update the specified client in the database.
     */
    public function update(Request $request, $id)
    {
        $client = clientWO::find($id);

        if (!$client) {
            return back()->with('error', 'Client Work Order not found.');
        }

        $validated = $request->validate([
            'client_name' => 'required',
            'client_address' => 'required',
            'client_phone_no' => 'required',
            'client_work_order' => 'required',
            'work_order_date' => 'required',
            'document' => 'nullable', // Only document file validation
        ]);

        // Update the document if provided
        if ($request->hasFile('document')) {
            // Delete the old document if it exists
            if ($client->document) {
                \Storage::delete('public/' . $client->document);
            }
            $validated['document'] = $request->file('document')->store('work_order_documents', 'public');
        }

        $client->update($validated);

        return redirect()->route('clientWork/index')->with('success', 'Client Work Order updated successfully.');
    }

    /**
     * Show the PDF of the specified client work order.
     */
    public function showPdf($id)
    {
        $client = clientWO::find($id);

        if (!$client) {
            return back()->with('error', 'Client Work Order not found.');
        }

        // Get the document path if it exists
        $documentPath = $client->document ? 'storage/' . $client->document : null;

        return Inertia::render('clientWork/pdf', [
            'client' => $client,
            'documentPath' => $documentPath,
        ]);
    }
}
