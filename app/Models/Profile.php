<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Profile extends Model
{
    protected $fillable = [
        'gender',
        'phone_number',
        'dob',
        'state',
        'country',
        'image_url',
        'marital_status',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo( User::class);
    }
}
