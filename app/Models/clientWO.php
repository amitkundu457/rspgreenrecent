<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class clientWO extends Model
{
    //
    use HasFactory;

    protected $fillable = ['client_name', 'client_address', 'client_phone_no', 'client_work_order', 'work_order_date']; //
}
