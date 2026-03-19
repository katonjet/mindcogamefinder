<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    protected $table = 'games';

    public $timestamps = false;

    protected $fillable = [
        //'developer_id',
        'title',
        'releasedate',
        'desc',
        'platforms',
        'genres',
        'backdropimagepath',
        //'posterimagepath',
        'avgrating'
        ];

    protected $casts = [
        'platfroms' => 'array',
        'genres' => 'array', //json auto encode/decode
    ];

    protected $attributes = [
        'platforms' => '[]',
        'genres' => '[]'//default to empty JSON array
    ];

    //get creator/developer of this game
    /*public function getDeveloper(){
        return $this->belongsTo(Developer::class, 'developer_id');
    }*/

    public function getGameName(){
        return $this->title;
    }

    public function getReleaseDate(){
        //be mindful about the data structure here(ie date may return as a string or some php Date object????)
        return $this->releasedate;
    }

    public function getDesc(){//Description
        return $this->desc;
    }

    public function getPlatforms(){
        return $this->platforms;
    }

    public function getGenres(){
        return $this->genres;
    }

    public function getBackdropURI(){
        return $this->backdropimagepath;
    }

    /*public function getPosterURI(){
        return $this->posterimagepath;
    }*/

    public function getGameRating(){
        return $this->avgrating;
    }

    //TRIGGERED AUTOMATICALLY AFTER REVIEW ENTRY
    //(aka WHEN A USER FINISHES WRITING AND SUBMITTING A REVIEW)
    public function updateGameRating(){
        //Some average calculation logic. make sure new value is also part of it
        //Poll average from DB
    }
}
