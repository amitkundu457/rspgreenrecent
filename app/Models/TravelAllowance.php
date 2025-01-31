<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TravelAllowance extends Model
{
    use HasFactory;

    protected $table = 'travel_allowances';

    protected $fillable = [
        'employee_name',
        'amount',
        'destination',
        'travel_date',
        'reason',
        'document_path',
        'status',
        'payment_by',
        'payment_mode',
        'extra_payment'

    ];
}
