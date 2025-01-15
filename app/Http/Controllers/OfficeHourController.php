<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\OfficeHour;
use Illuminate\Http\Request;

class OfficeHourController extends Controller
{
    // Display a list of all office hours
    public function index()
    {
        $officeHours = OfficeHour::all(); // Fetch all office hours from the database
        return Inertia::render('salary/officeTime', [
            'officeHours' => $officeHours, // Pass office hours to the Inertia view
        ]);
    }

    // Store a new office hour entry in the database
    public function store(Request $request)
    {
        // Validate the incoming request
        $validated = $request->validate([
            'start_time' => 'required|date_format:H:i', // Validate start_time format
            'end_time' => 'required|date_format:H:i|after:start_time', // Validate end_time and ensure it's after start_time
        ]);

        // Create a new office hour record in the database
        $officeHour = OfficeHour::create($validated);

        // Return the newly created office hour record in JSON format with a 201 status code
        return response()->json($officeHour, 201);
    }

    // Update an existing office hour entry in the database
    public function update(Request $request, $id)
    {
        // Find the office hour by ID or fail
        $officeHour = OfficeHour::findOrFail($id);

        // Validate the incoming request
        $validated = $request->validate([
            'start_time' => 'required|date_format:H:i', // Validate start_time format
            'end_time' => 'required|date_format:H:i|after:start_time', // Validate end_time and ensure it's after start_time
        ]);

        // Update the office hour with the validated data
        $officeHour->update($validated);

        // Return the updated office hour record in JSON format
        return response()->json($officeHour);
    }

    // Delete an office hour entry from the database
    public function destroy($id)
    {
        // Find the office hour by ID or fail
        $officeHour = OfficeHour::findOrFail($id);

        // Delete the office hour record from the database
        $officeHour->delete();

        // Return a success message indicating the office hour has been deleted
        return response()->json(['message' => 'Office hour deleted']);
    }
}
