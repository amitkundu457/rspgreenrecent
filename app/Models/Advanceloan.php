<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Advanceloan extends Model
{
    //
    use HasFactory;

    protected $table = 'advanceloan';

    protected $fillable = [
        'borrower_name',
        'loan_amount',
        'loan_date',
        'due_date',
        'remarks',
        'Payable_Amount',
        'Remaining_Amount',
        'user_id'
    ];
}
