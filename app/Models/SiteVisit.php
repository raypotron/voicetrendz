<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SiteVisit extends Model
{
    protected $fillable = [ 'ip', 'user_agent', 'browser', 'device', 'platform'];
}
