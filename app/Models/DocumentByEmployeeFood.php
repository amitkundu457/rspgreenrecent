<?php

namespace App\Models;

use App\Models\FoodAllowance;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class DocumentByEmployeeFood extends Model
{
    use HasFactory;

    // Specify the table name explicitly
    protected $table = 'documents_byemployeefood';

    protected $fillable = [
        'food_allowance_id', // Foreign key reference to TravelAllowance
        'employee_id',
        'document_path',
    ];

    // Define relationship with TravelAllowance
    public function foodAllowance()
    {
        return $this->belongsTo(FoodAllowance::class, 'food_allowance_id');
    }
}
