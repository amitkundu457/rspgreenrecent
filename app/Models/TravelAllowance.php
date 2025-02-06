<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TravelAllowance extends Model
{
    use HasFactory;

    // Allow mass assignment
    protected $fillable = [
        'employee_id',
        'amount',
        'destination',
        'travel_date',
        'reason',
        'payment_by',
        'extra_payment',
        'status',
    ];

    // Relationship with DocumentByEmployee
    public function documentsByEmployee()
    {
        return $this->hasMany(DocumentByEmployee::class, 'travel_allowance_id');
    }

    // Relationship with Employee
    public function employee()
    {
        return $this->belongsTo(Employee::class, 'employee_id');
    }

    // Relationship with DestinationAmount (Assuming there is a destination_amounts table)
    public function destinationAmount()
    {
        return $this->hasOne(DestinationAmount::class, 'destination_id', 'destination');
    }
}
