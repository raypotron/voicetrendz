<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Poll extends Model
{
    protected $fillable = [
        'slug',
        'question',
        'description',
        'expires_at',
    ];

    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function scopeActive($query)
    {
        return $query->where('expires_at', '>', now());
    }

    public function options()
    {
        return $this->hasMany(PollOption::class);
    }
}
