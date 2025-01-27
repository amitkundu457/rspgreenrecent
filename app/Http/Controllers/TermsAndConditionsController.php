<?php

namespace App\Http\Controllers;

use App\Models\TermsAndConditions;
use Inertia\Inertia;

class TermsAndConditionsController extends Controller
{
    /**
     * Display the terms and conditions page.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        // Fetch all terms from the database
        $terms = TermsAndConditions::all();

        // Render the Inertia page and pass the terms data
        return Inertia::render('term/index', [
            'terms' => $terms,
        ]);
    }

    /**
     * Store a new term in the database.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'term' => 'required|string|max:255',
        ]);

        TermsAndConditions::create($validated);

        return redirect()->route('term.index')->with('success', 'Term added successfully!');
    }

    /**
     * Delete a term from the database.
     *
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy($id)
    {
        $term = TermsAndConditions::findOrFail($id);
        $term->delete();

        return redirect()->route('term.index')->with('success', 'Term deleted successfully!');
    }
}
