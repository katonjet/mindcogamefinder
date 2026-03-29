<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Gamegenrerelate extends Model
{
    protected $table = 'Gamegenrerelates';
    protected $fillable = [
        'game_id',
        'genre_id',
        ];
}
