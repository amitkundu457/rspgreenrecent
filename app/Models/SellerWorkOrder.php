<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SellerWorkOrder extends Model
{
    use HasFactory;

    protected $fillable = [
        'seller_name',
        'seller_address',
        'date_of_wo',
        'subject',
        'contact_person_name',
        'job_details',
        'task',
        'quantity',
        'uom',
        'rate',
        'amount',
        'hsn_code',
        'gst_rate',
        'total_with_gst',
    ];
}
