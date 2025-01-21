<?php

namespace App\Http\Controllers;

use App\Models\SellerWorkOrder;
use Inertia\Inertia;
use Illuminate\Http\Request;

class SellerWorkOrderController extends Controller
{
    // List all Seller Work Orders and send data to the React page
    public function index()
    {
        $workOrders = SellerWorkOrder::all(); // Fetch all work orders
        // dd($workOrders);
        return Inertia::render('sallerWork/index', [
            'workOrders' => $workOrders
        ]);
    }

    // Create a new Seller Work Order
    public function store(Request $request)
    {
        // dd($request->all());
      
        $request->validate([
            // 'seller_name' => 'required',
            // 'seller_address' => 'required',
            // 'date_of_wo' => 'required',
            // 'subject' => 'required',
            // 'contact_person_name' => 'required',
            // 'job_details' => 'required',
            // 'task' => 'required',
            // 'quantity' => 'required',
            // 'uom' => 'required',
            // 'rate' => 'required',
            // 'amount' => 'required',
            // 'hsn_code' => 'required',
            // 'gst_rate' => 'required',
            // 'total_with_gst' => 'required',
        ]);

        $workOrder = SellerWorkOrder::create($request->all());

        return redirect()->route('sallerWork/index')->with('message', 'Work Order created successfully');
    }

    // Show a specific Seller Work Order
    public function show($id)
    {
        dd($request->all());
        $workOrder = SellerWorkOrder::findOrFail($id);
        return Inertia::render('sallerWork/index', [
            'workOrder' => $workOrder
        ]);
    }

    // Update an existing Seller Work Order
    public function update(Request $request, $id)
    {
        $workOrder = SellerWorkOrder::findOrFail($id);

        $request->validate([
            // 'seller_name' => 'required',
            // 'seller_address' => 'required',
            // 'date_of_wo' => 'required',
            // 'subject' => 'required',
            // 'contact_person_name' => 'required',
            // 'job_details' => 'required',
            // 'task' => 'required',
            // 'quantity' => 'required',
            // 'uom' => 'required',
            // 'rate' => 'required',
            // 'amount' => 'required',
            // 'hsn_code' => 'required',
            // 'gst_rate' => 'required',
            // 'total_with_gst' => 'required',
        ]);

        $workOrder->update($request->all());

        return redirect()->route('sallerWork/index')->with('message', 'Work Order updated successfully');
    }

    // Delete a Seller Work Order
    public function destroy($id)
    {
        $workOrder = SellerWorkOrder::findOrFail($id);
        $workOrder->delete();

        return redirect()->route('sallerWork/index')->with('message', 'Work Order deleted successfully');
    }
}
