<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TravelAllowance extends Model
{
    use HasFactory;

    protected $fillable = [
        'employee_name',
        'amount',
        'destination',
        'travel_date',
        'reason',
        'document_path',
    ];
}
