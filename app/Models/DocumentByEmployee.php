<?php
namespace App\Models;

use App\Models\TravelAllowance;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class DocumentByEmployee extends Model
{
    use HasFactory;

    // Specify the table name if it's not the plural form of the model
    protected $table = 'documents_byemployee';

    // Specify the fillable attributes to protect against mass assignment
    protected $fillable = [
        'employee_id',
        'document_name',
        'document_path',
    ];

    // Define relationships if needed
    public function travelAllowance()
    {
        return $this->belongsTo(TravelAllowance::class);
    }
}
