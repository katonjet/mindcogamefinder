<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

//COLORS VALIDATED VIA CONTROLLER LIKE THIS -  USED FOR THEMEING PLATFORMS
/*
$request->validate([
    'color' => ['required', 'hex_color'],
]);
 */

//RESTRICT NUMBERIC VALUE RANGE(ie between 3 and 8) - USED FOR GAME RATINGS
/*
use Illuminate\Validation\Rules\Numeric;

'rating' => [
    Rule::numeric()->min(3.0)->max(8.0)
]
*/
//Method 2 (string based rules)
/*
'rating' => 'numeric|min:3.0|max:8.0'
*/

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        //Playable platforms. ie. Steam Deck, iOS, Android, etc...
        Schema::create('systemplatforms', function (Blueprint $table) {
            $table->id(); //Primary Key
            $table->string('title', 50)->unique()->nullable(false); //platform name
            $table->string('themecolor', 7)->default('#787878')->nullable(false); //background COLOR in hex with hash
            $table->timestamps();
        });

        //Game Genre. ie. Scifi, RPG, ETC...
        Schema::create('genres', function (Blueprint $table) {
            $table->id(); //Primary Key
            $table->string('title', 50)->unique()->nullable(false); //genre name
            $table->string('themecolor', 7)->default('#787878')->nullable(false); //background COLOR in hex with hash
            $table->timestamps();
        });

        //Users - update existing user schema
        Schema::table('users', function (Blueprint $table) {
            $table->string('username', 50)->unique()->nullable(false); //max 50 char username that is unique
        });

        //Game developers
        /*Schema::create('developers', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->string('title', 50)->unique()->nullable(false); // developer name
            $table->text('profileimagepath')->nullable(true); // URI path to uploaded profile image
            $table->string('username', 50)->unique()->nullable(false);
            $table->timestamps();
        });*/

        //Games
        Schema::create('games', function (Blueprint $table) {
            $table->id(); //Primary key
            $table->string('title', 255)->unique()->nullable(false); //Game name
            $table->date('releasedate')->nullable(false); //game release date
            $table->text('desc')->nullable(false); //Description of the game. default should be "No description". to be set by controller
            $table->text('backdropimagepath'); // URI path to uploaded backdrop image
            //$table->text('posterimagepath'); // URI path to uploaded poster image
            //$table->decimal('avgrating', 3, 1)->default(0.0)->nullable(false); //Auto calculated average rating score from 1 to 5. default zero (0.0[0])
            $table->decimal('avgrating')->default(0.0)->nullable(false); //Auto calculated average rating score from 1 to 5. default zero (0.0[0])
            $table->decimal('avgcount')->default(0.0)->nullable(false); //total review count for efficient average calculation
            $table->timestamps();
        });

        //Reviews
        Schema::create('reviews', function (Blueprint $table) {
            $table->id(); //Primary key
            $table->foreignId('user_id')->nullable(false)->constrained('users'); //user who is reviewing
            $table->foreignId('game_id')->nullable(false)->constrained('games'); //game being reviewed
            $table->decimal('rating', 3, 1)->nullable(false); //Rating. used to calculate new game average (Range - 0 to 5)
            $table->text('title')->nullable(true); //Optional Title of the comment
            $table->text('comment')->nullable(true); //Optional User Comment/opinion
            $table->timestamps();
        });

        //Game-Dev Relation
        /*Schema::create('gamedevrelates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('developer_id')->nullable(false)->constrained('developers');
            $table->foreignId('game_id')->nullable(false)->constrained('games');
            $table->primary(['id', 'developer_id', 'game_id']);
            $table->timestamps();
        });*/

        //game-platform(system)
        Schema::create('gameplatformrelates', function (Blueprint $table){
            $table->id();
            $table->foreignId('game_id')->nullable(false)->constrained('games');
            $table->foreignId('systemplatform_id')->nullable(false)->constrained('systemplatforms');
            $table->primary(['id', 'game_id', 'systemplatform_id']);
            $table->timestamps();
        });


        //game-genre
        Schema::create('gamegenrerelates', function (Blueprint $table){
            $table->id();
            $table->foreignId('game_id')->nullable(false)->constrained('games');
            $table->foreignId('genre_id')->nullable(false)->constrained('genres');
            $table->primary(['id', 'game_id', 'genre_id']);
            $table->timestamps();
        });

        //Collections
        Schema::create('collections', function (Blueprint $table) {
            $table->id(); //Primary key
            $table->foreignId('user_id')->nullable(false)->constrained('users'); //user who is reviewing
            $table->foreignId('game_id')->nullable(false)->constrained('games'); 
            $table->primary(['id', 'user_id', 'game_id']); // A user cannot add the same game more than once
            $table->string('type', 8)->nullable(false); // collection type [ either wishlist or favorite ]
            $table->foreignId('genre_id')->nullable(false)->constrained('genres'); //for finding users fav genres by using DISTINCT/Unique identifier
            $table->timestamps();
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //Reverse order to up()
        Schema::dropIfExists('collections');
        Schema::dropIfExists('gamegenrerelates');
        Schema::dropIfExists('gameplatformrelates');
        //Schema::dropIfExists('gamedevrelates');

        Schema::dropIfExists('reviews');
        Schema::dropIfExists('games');
        //Schema::dropIfExists('developers');

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('username');
        });

        Schema::dropIfExists('genres');
        Schema::dropIfExists('systemplatforms');

    }
};
