<?php

namespace App\Http\Controllers\Allowances\TravelRequest;

use App\Http\Controllers\Controller;
use App\Models\DestinationAmount;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DestinationAmountController extends Controller
{
    public function index()
    {
        return Inertia::render('Allowances/TravelRequest', [
            'destinationAmounts' => DestinationAmount::all()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'destination' => 'required|string|max:255',
            'amount' => 'required|numeric'
        ]);

        DestinationAmount::create($validated);

        return redirect()->route('destination-amounts.index')->with('success', 'Destination amount added successfully.');
    }

    public function update(Request $request, DestinationAmount $destinationAmount)
    {
        $validated = $request->validate([
            'destination' => 'string|max:255',
            'amount' => 'numeric'
        ]);

        $destinationAmount->update($validated);

        return redirect()->route('destination-amounts.index')->with('success', 'Destination amount updated successfully.');
    }

    public function destroy(DestinationAmount $destinationAmount)
    {
        $destinationAmount->delete();

        return redirect()->route('destination-amounts.index')->with('success', 'Destination amount deleted successfully.');
    }
}
