<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Game extends Model
{
    protected $table = 'games';

    protected $fillable = [
        'title',
        'releasedate',
        'desc',
        'backdropimagepath',
        'avgrating',
        'avgcount',
        ];

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
