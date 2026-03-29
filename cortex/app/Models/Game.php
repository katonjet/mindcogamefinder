<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Game extends Model
{
    protected $table = 'games';

    protected $fillable = [
        //'developer_id',
        'title',
        'releasedate',
        'desc',
        'platforms',
        'genres',
        'backdropimagepath',
        //'posterimagepath',
        'avgrating',
        'avgcount',
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

    /*public function getPosterURI(){
        return $this->posterimagepath;
    }*/

    protected function avgrating(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value,
            set: fn ($value) => $value,
        );
    }
    protected function avgcount(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value,
            set: fn ($value) => $value,
        );
    }

}
