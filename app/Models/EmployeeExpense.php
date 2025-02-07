<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeeExpense extends Model
{
    use HasFactory;

    protected $fillable = [
        'employee_id',
        'amount',
        'reason',
        'photo_path',
    ];

    // Relationship with User Model
    public function employee()
    {
        return $this->belongsTo(User::class, 'employee_id');
    }
}
