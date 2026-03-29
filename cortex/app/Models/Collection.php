<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

//how to get key ID / Primary key of a model.
// $model->getKey();  (getKeyName() is to get column name that stores the primary key)

class Collection extends Model
{
    protected $table = 'collections';
    protected $fillable = [
        'user_id',
        'game_id',
        'type',
        'genre_id'
        ];

    /*protected $casts = [
        'games' => 'array', //Automatic JSON encode/decode
    ];

    protected $attributes = [
        'games' => '[]', //default to empty JSON array
    ];*/

}
