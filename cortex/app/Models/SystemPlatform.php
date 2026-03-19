<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SystemPlatform extends Model
{
    protected $table = 'systemplatforms'; //Table name
    protected $fillable = ['title', 'svgcontent']; //columns / attributes
    //protected $fillable = ['title', 'themecolor', 'fontcolor', 'svgcontent']; //columns / attributes
}
