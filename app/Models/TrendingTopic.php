<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TrendingTopic extends Model
{
    use SoftDeletes;
    
    protected $fillable = [
        'topic', 'key'
    ];
}
