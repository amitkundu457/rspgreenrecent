<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class DocumentByEmployee extends Model
{
    use HasFactory;

    // Specify the table name explicitly
    protected $table = 'documents_byemployee';

    // Allow mass assignment for these fields
    protected $fillable = [
        'travel_allowance_id', // Foreign key reference to TravelAllowance
        'employee_id',

        'document_path',
    ];

    // Define relationship with TravelAllowance
    public function travelAllowance()
    {
        return $this->belongsTo(TravelAllowance::class, 'travel_allowance_id');
    }
}
