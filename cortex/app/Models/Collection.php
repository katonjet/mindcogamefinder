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
        'title',
        'games'
        ];

    protected $casts = [
        'games' => 'array', //Automatic JSON encode/decode
    ];

    protected $attributes = [
        'games' => '[]', //default to empty JSON array
    ];

    //get owner of this game collection
    public function getUser(){
        return $this->belongsTo(User::class, 'user_id');
    }

    //get name of the collection
    public function getCollectionName() {
        return $this->title;
    }

    //get game list as arrays
    public function getGameList(){
        return $this->games;
    }
}
