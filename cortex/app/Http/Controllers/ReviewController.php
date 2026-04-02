<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\Review;
use App\Models\User;
use Illuminate\Http\Request;

class ReviewController extends Controller
{

    //Get review(s) of a game when loaded (the index function) (login not required)
    public function getReview($gameid){

        //find game reviews
        $gamereview = Review::where('game_id', $gameid)->get();
        return $gamereview ? response()->json($gamereview) : response()->json(null, 404);

    }

    //Get review(s) of a game when loaded (the index function) (login not required)
    public function getReviewFromUser($userid){
        //find game reviews based on user id
        //$gamereview = Review::where('user_id', $userid)->get();
        $gamereview = Review::with('game:id,backdropimagepath')->where('user_id', $userid)->orderBy('updated_at', 'desc')->get();
        return $gamereview ? response()->json($gamereview) : response()->json(null, 404);
    }

    //Filler function
    public function index()
    {
        return response()->json([
            'message' => 'Not found',
        ],404);
    }

    /**
     * Submit new review for a game (requires auth)
     */
    public function store(Request $request)
    {
        $request->validate([
            'gameid' => 'required|numeric',
            'userid' => 'required|numeric',
            'rating' => 'required|numeric|max:5|min:1', //Rating range 1 to 5
            'title' => 'nullable|string|max:255',
            'comment' => 'nullable|string',
        ]);

        $game = Game::find($request->gameid);
        $user = User::find($request->userid);
        $rating = $request->rating; //user entered rating
        $title = $request->title;
        $comment = $request->comment;

        Review::create([
            'user_id' => $user->id,
            'game_id' => $game->id,
            'rating' => $rating,
            'title' => ($title) ? ($title) : null,
            'comment' => ($comment) ? ($comment) : null,
        ]);

        //Re-calculate game average rating
        $oldavgrating = $game->avgrating; //average rating of game
        $oldavgcount = $game->avgcount; //average rating of game
    
        $newavgrating = $oldavgrating + ( ($rating - $oldavgrating) / ($oldavgcount + 1) ); //new average
        $newavgcount = $oldavgcount + 1;

        $game->avgrating = $newavgrating; //new average
        $game->avgcount = $newavgcount; //increment review count
        $game->save(); //save changes to db

        return response()->json([
            'message' => 'Game review created',
        ]);
    
    }

    /**
     * Display the specified resource.
     */
    public function show($review_)
    {
        $review = Review::find($review_);
        return $review ? response()->json($review) : response()->json(null, 404);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $review)
    {
        $request->validate([ //validate things to be updates
            'rating' => 'required|numeric|max:5|min:1', //Rating range 1 to 5
            'title' => 'nullable|string|max:255',
            'comment' => 'nullable|string',
        ]);

        $review_ = Review::find($review);

        //rating update of game (if review rate changed)
        if ($request->rating != $review_->rating) {
            $game = Game::find($review_->game_id);
            $unchaned_avgcount = $game->avgcount;
            $oldrating = $review_->rating;
            $newrating = $request->rating;
            $prev_avgrating = $game->avgrating;
    
            //to solve zero division problem with one comment present
            if ($unchaned_avgcount<=1) {
                $game->avgrating = 0 + ( ($newrating - 0) / ($unchaned_avgcount) ); //replace rating
            } else {
                $constcalc_oldrating = (($prev_avgrating * $unchaned_avgcount) - $oldrating) / ( $unchaned_avgcount - 1 ); //remove old rating
                $game->avgrating = $constcalc_oldrating  + ( ($newrating - $constcalc_oldrating) / ($unchaned_avgcount) ); //add new rating
            }

            $game->save(); //save new changes
        }

        //update data entries
        $review_->rating = $request->rating;
        $review_->title = $request->title;
        $review_->comment = $request->comment;
        $review_->save();

        return response()->json([
            'message' => 'Game review updated',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Review $review)
    {
        $game = Game::find($review->game_id);
        $deletingrating = $review->rating;

        //Re-calculate game average rating
        $oldavgrating = $game->avgrating; //average rating of game
        $oldavgcount = $game->avgcount; //average rating of game

        //to solve zero division problem with one comment present
        if ($oldavgcount<=1) {
            $game->avgrating = 0;
        } else {
            $game->avgrating = (($oldavgrating * $oldavgcount) - $deletingrating) / ( $oldavgcount - 1 ); //new average
        }

        $game->avgcount--; //decrement review count
        $game->save(); //save changes to db

        $review->delete(); // delete review

        return response()->json([
            'message' => 'Game review deleted',
        ]);

    }
}
