<?php

namespace App\Http\Controllers;

use App\Models\SellerWorkOrder;
use Inertia\Inertia;
use Illuminate\Http\Request;

class SellerWorkOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Fetch all seller work orders from the database
        $workOrders = SellerWorkOrder::all();

        // Render the Inertia page with the fetched data
        return Inertia::render('sallerWork/index', [
            'workOrders' => $workOrders
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the incoming request
        $request->validate([
            // 'seller_name' => 'required',
            // 'seller_address' => 'required',
            // 'date_of_wo' => 'required|date',
            // 'subject' => 'required',
            // 'contact_person_name' => 'required',
            // 'job_details' => 'required',
            // 'task' => 'required',
            // 'quantity' => 'required|numeric',
            // 'uom' => 'required',
            // 'rate' => 'required|numeric',
            // 'amount' => 'required|numeric',
            // 'hsn_code' => 'required',
            // 'gst_rate' => 'required|numeric',
            // 'total_with_gst' => 'required|numeric',

        ]);

        // Create a new work order
        SellerWorkOrder::create($request->all());

        // Redirect to the index page with a success message
        return redirect()->route('sallerWork/index')->with('message', 'Work Order created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // Fetch the specific work order by ID
        $workOrder = SellerWorkOrder::findOrFail($id);

        // Render the Inertia page with the specific work order data
        return Inertia::render('sallerWork/index', [
            'workOrder' => $workOrder
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Fetch the specific work order by ID
        $workOrder = SellerWorkOrder::findOrFail($id);

        // Validate the incoming request
        $request->validate([
            // 'seller_name' => 'required',
            // 'seller_address' => 'required',
            // 'date_of_wo' => 'required|date',
            // 'subject' => 'required',
            // 'contact_person_name' => 'required',
            // 'job_details' => 'required',
            // 'task' => 'required',
            // 'quantity' => 'required|numeric',
            // 'uom' => 'required',
            // 'rate' => 'required|numeric',
            // 'amount' => 'required|numeric',
            // 'hsn_code' => 'required',
            // 'gst_rate' => 'required|numeric',
            // 'total_with_gst' => 'required|numeric',
        ]);

        // Update the work order with new data
        $workOrder->update($request->all());

        // Redirect to the index page with a success message
        return redirect()->route('sallerWork/index')->with('');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // Fetch the specific work order by ID
        $workOrder = SellerWorkOrder::findOrFail($id);

        // Delete the work order
        $workOrder->delete();

        // Redirect to the index page with a success message
        return redirect()->route('sallerWork/index')->with('message', '');
    }
    public function showPdf($id)
    {
        $client = SellerWorkOrder::find($id);

        if (!$client) {
            return back()->with('error', '');
        }

        // Get the document path if it exists
        $documentPath = $client->document ? 'storage/' . $client->document : null;

        return Inertia::render('sallerWork/pdf', [
            'client' => $client,
            'documentPath' => $documentPath,
        ]);
    }
}
