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

    public function game(){
        return $this->belongsTo(Game::class);
    }
    public function systemplatform(){
        return $this->belongsTo(Systemplatform::class);
    }
}
