<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Genre extends Model
{
    protected $table = 'genres'; //table name
    protected $fillable = ['title', 'themecolor']; // columns/attributes

}
