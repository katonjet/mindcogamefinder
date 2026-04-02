<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Gameplatformrelate extends Model
{
    protected $table = 'gameplatformrelates';
    protected $fillable = [
        'game_id',
        'systemplatform_id',
        ];
}
