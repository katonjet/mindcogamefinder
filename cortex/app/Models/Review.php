<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    protected $table = 'reviews';
    protected $fillable = [
        'user_id',
        'game_id',
        'rating',
        'title',
        'comment'
        ];

    //get the commenter/users details
    public function getUser(){
        return $this->belongsTo(User::class, 'user_id');
    }

    //get the game that this comment belogs to
    public function getGame(){
        return $this->belongsTo(Game::class, 'game_id');
    }
}
