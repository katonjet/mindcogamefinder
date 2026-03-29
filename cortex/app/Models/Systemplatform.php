<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Systemplatform extends Model
{
    protected $table = 'systemplatforms'; //Table name
    protected $fillable = ['title', 'themecolor']; //columns / attributes

}
