<?php
namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Holiday;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HolidayController extends Controller
{
    public function index()
    {
        // Get all holidays
        $holidays = Holiday::all();
        $vacations = DB::table('locations_holiday')->pluck('name');
        // Return Inertia view with holidays data
        return Inertia::render('location/index', [
            'holidays' => $holidays,
            'vacations' => $vacations
        ]);
    }

    public function store(Request $request)
    {
        // Validate the request
        $request->validate([
            'name' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'location' => 'required|string',
        ]);
    
        // Get the location ID based on the location name
        $locationId = DB::table('locations_holiday')
            ->where('name', $request->input('location'))
            ->value('id');
    
        if (!$locationId) {
            return response()->json(['error' => 'Invalid location selected.'], 400);
        }
    
        // Create a new holiday
        // $holiday = new Holiday;
        // $holiday->name = $request->input('name');
        // $holiday->start_date = $request->input('start_date');
        // $holiday->end_date = $request->input('end_date');
        // $holiday->location_id = $locationId;  // Store the correct location ID
        // $holiday->save();
    
        // Return an Inertia response with all holidays
        return Inertia::render('location/index', [
            'holidays' => Holiday::all(), // Optionally update the list after creation
        ]);
    }
    

    public function update(Request $request, $id)
    {
        // Find the holiday by id
        $holiday = Holiday::findOrFail($id);

        // Validate the request
        $request->validate([
            'name' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            // 'location' => 'required|string',
        ]);

        // Update the holiday
        $holiday->update($request->all());

        // Return an Inertia response with updated holidays
        return Inertia::render('location/index', [
            'holidays' => Holiday::all(),
        ]);
    }

    public function destroy($id)
    {
        // Find the holiday by id
        $holiday = Holiday::find($id);

        if ($holiday) {
            // Delete the holiday
            $holiday->delete();

            // Return an Inertia response after deletion
            return Inertia::render('location/index', [
                'holidays' => Holiday::all(), // Refresh the holidays list after deletion
            ]);
        }

        // If holiday not found, return an error message
        return Inertia::render('location/index', [
            'message' => 'Holiday not found',
            'holidays' => Holiday::all(),
        ]);
    }

    public function HolidayCalender(Request $request)
    {
        // Get all distinct locations for the location dropdown
        $locations = Holiday::distinct('location')->pluck('location');

        // Get location from the request query parameters
        $location = $request->query('location');

        // Start query to fetch holidays, ordered by start date
        $holidays = Holiday::orderBy('start_date', 'asc');

        // If location is provided, filter holidays by location
        if ($location) {
            $holidays = $holidays->where('location', $location);
        }

        // Fetch holidays
        $holidays = $holidays->get();

       
        if ($holidays->isEmpty()) {
            \Log::info("No holidays found for location: " . $location);
        }

      
        return Inertia::render('location/holidayCalender', [
            'holidays' => $holidays->isEmpty() ? [] : $holidays->toArray(),
            'locations' => $locations,
        ]);
    }
}
