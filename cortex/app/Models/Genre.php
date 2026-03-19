<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Genre extends Model
{
    protected $table = 'genres'; //table name
    protected $fillable = ['title', 'svgcontent']; // columns/attributes

    public function getGenreName(){
        return $this->title;
    }

    //Returns svg icon as base 64 data
    public function getSVGData(){
        return $this->svgcontent;
    }
}
