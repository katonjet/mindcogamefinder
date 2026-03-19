<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Developer extends Model
{
    protected $table = 'developers';
    protected $fillable = ['title', 'profileimagepath', 'backdropimagepath'];

    public function getDeveloperName(){
        return $this->title;
    }

    public function getBackdropURI() {
        return $this->backdropimagepath;
    }

    public function getProfileImageURI() {
        return $this->profileimagepath;
    }
}
