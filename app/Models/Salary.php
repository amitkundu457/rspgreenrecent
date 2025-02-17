<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Salary extends Model
{
    use HasFactory;

    protected $fillable=[
'employee_id',
'salary_name',
'generate_date',
'generate_by',
'status',
'approved_date',
'approved_by',
'total_amount',
'allowance',
'additional_deduction'
    ];
}
