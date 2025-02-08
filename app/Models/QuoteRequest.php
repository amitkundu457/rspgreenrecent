<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class QuoteRequest extends Model
{
    //
    use HasFactory;
    protected $fillable = [
        'name',
        'email',
        'contact',
        'subject',
        'message',
        'document',
        'source',
        'lastdate'
    ];
}
