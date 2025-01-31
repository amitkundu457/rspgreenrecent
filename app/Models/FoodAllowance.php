<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class FoodAllowance extends Model
{
    use HasFactory;

    protected $fillable = [
        'employee_name',
        'amount',
        'food_date',
        'reason',
        'document_path'
    ];
}
