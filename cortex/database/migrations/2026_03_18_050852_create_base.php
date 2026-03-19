<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

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
            $table->string('title', 50)->nullable(false); //platform name
            //$table->string('themecolor', 7)->nullable(false); //background COLOR in hex with hash
            //$table->string('fontcolor', 7)->nullable(false); //text COLOR in hex with hash . check above how it is validated
            $table->text('svgcontent')->nullable(false); //svg icon file in base 64 format (image/svg+xml)
        });

        //Game Genre. ie. Scifi, RPG, ETC...
        Schema::create('genres', function (Blueprint $table) {
            $table->id(); //Primary Key
            $table->string('title', 50)->nullable(false); //genre name
            $table->text('svgcontent')->nullable(false); //svg icon file in base 64 format (image/svg+xml)
        });

        //Users - update existing user schema
        Schema::table('users', function (Blueprint $table) {
            $table->text('profileimagepath')->nullable(true); // URI path to uploaded profile picture
            $table->string('username', 50)->unique()->nullable(false); //max 50 char username that is unique
        });

        //Game developers
        Schema::create('developers', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->string('title', 50)->nullable(false); // developer name
            $table->text('profileimagepath'); // URI path to uploaded profile picture
            $table->text('backdropimagepath'); // URI path to uploaded backdrop image
        });

        //Games
        Schema::create('games', function (Blueprint $table) {
            $table->id(); //Primary key
            //$table->foreignId('developer_id')->nullable(false)->constrained('developers'); //Developer of the game
            $table->string('title', 255)->nullable(false); //Game name
            $table->date('releasedate')->nullable(false); //game release date
            $table->text('desc')->nullable(false); //Description of the game. default should be "No description". to be set by controller
            $table->json('platforms')->nullable(false); //Supported platforms as JSON array. default none
            $table->json('genres')->nullable(false); //Genres as JSON array. default none
            $table->text('backdropimagepath'); // URI path to uploaded backdrop image
            //$table->text('posterimagepath'); // URI path to uploaded poster image
            $table->decimal('avgrating', 3, 1)->default(0.0)->nullable(false); //Auto calculated average rating score from 0 to 5. default zero (0.0[0])
        });

        //Reviews
        Schema::create('reviews', function (Blueprint $table) {
            $table->id(); //Primary key
            $table->foreignId('user_id')->nullable(false)->constrained('users'); //user who is reviewing
            $table->foreignId('game_id')->nullable(false)->constrained('games'); //game being reviewed
            $table->decimal('rating', 3, 1)->nullable(false); //Rating. used to calculate new game average (Range - 0 to 5)
            $table->text('title'); //Optional Title of the comment
            $table->text('comment'); //Optional User Comment/opinion
        });

        //Collections
        Schema::create('collections', function (Blueprint $table) {
            $table->id(); //Primary key
            $table->foreignId('user_id')->nullable(false)->constrained('users'); //user who is reviewing
            $table->string('title', 255)->nullable(false); // Name of the collection
            $table->json('games')->nullable(false); //List of games as JSON array. default none
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //Reverse order to up()
        Schema::dropIfExists('collections');
        Schema::dropIfExists('reviews');
        Schema::dropIfExists('games');
        Schema::dropIfExists('developers');

        //Schema::dropIfExists('g_users');
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('profileimagepath');
            $table->dropColumn('username');
        });

        Schema::dropIfExists('genres');
        Schema::dropIfExists('systemplatforms');
    }
};
