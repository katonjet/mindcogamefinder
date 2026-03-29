<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
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

    public function game(){
        return $this->belongsTo(Game::class);
    }

    //get the game that this comment belogs to
    protected function gameId(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value,
            set: fn ($value) => $value,
        );
    }

    protected function title(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value,
            set: fn ($value) => $value,
        );
    }

    protected function comment(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value,
            set: fn ($value) => $value,
        );
    }

    protected function rating(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value,
            set: fn ($value) => $value,
        );
    }
}
