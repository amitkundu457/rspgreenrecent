<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TermsAndConditions extends Model
{
    use HasFactory;

    protected $table = 'terms_and_conditions';

    protected $fillable = ['term'];
}
