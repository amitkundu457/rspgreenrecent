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
     * Show the form for creating a new client.
     */
    public function create()
    {
        return Inertia::render('clientWork/index'); // Return Inertia response for creating a client
    }

    /**
     * Store a newly created client in the database.
     */
    public function store(Request $request)
    {
        // Validate the input
        $request->validate([
            'client_name' => 'required|string|max:255',
            'client_address' => 'required|string',
            'client_phone_no' => 'required|string|max:15',
            'client_work_order' => 'required|string|max:255',
            'work_order_date' => 'required|date',
        ]);

        // Create a new client
        clientWO::create($request->all());

        return redirect()->route('clientWork/index')->with('success', 'Client created successfully.');
    }

    /**
     * Show the form for editing the specified client.
     */
    public function edit(clientWO $client)
    {
        return Inertia::render('clientWork/index', [
            'client' => $client,
        ]); // Return Inertia response for editing the client
    }

    /**
     * Update the specified client in the database.
     */
    public function update(Request $request, clientWO $client)
    {
        // Validate the input
        $request->validate([
            'client_name' => 'required|string|max:255',
            'client_address' => 'required|string',
            'client_phone_no' => 'required|string|max:15',
            'client_work_order' => 'required|string|max:255',
            'work_order_date' => 'required|date',
        ]);

        // Update the client
        $client->update($request->all());

        return redirect()->route('clientWork/index')->with('success', 'Client updated successfully.');
    }

    /**
     * Remove the specified client from the database.
     */
    public function destroy(Request $request, $id)
    {

        $data = clientWO::find($id);


        if ($data) {
            // Delete the record
            $data->delete();


            return back()->with('success', 'Client work order deleted successfully!');
        } else {
            // If record not found, return an error message
            return back()->with('error', 'Client work order not found!');
        }
    }
}
