<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Loan extends Model
{
    use HasFactory;

    protected $fillable = [
        'employee_name', 'registration', 'loan_amount', 'reason', 
        'payment_type', 'duration_months', 'start_date', 'repayment_terms','user_id',

        'end_date', 'document','monthly_installment','months','amount','status'
    ];

    /**
     * Get the user that owns the loan.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
