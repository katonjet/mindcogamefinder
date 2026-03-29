# Brief explanation of the recommendation system

The recommendation system is being implemented to help end users discover games based on user preference and game popularity using Favorites-based similarity and Review-Based similarity strategies. These strategies will be implemented using Laravel Actions and having additional sections added to the frontend user interface.

# How the system works

When a user visits the website for the first time, assuming
that they are registered and logged in, that user is in a
cold start state where the system cannot yet do
recommendations. The recommendation system works as follows.

1. Users sees a game they like from the popular section or the what's new section which uses Review-Based similarity. (from Cold start)
2. User clicks a game that they like in either sections and sees the game details such as description, rating, reviews and more. 
   1. If the user likes the currently selected game, they add the game to collection
   2. If the user does not like the game but likes other similar games, they can select a genre they like from the current game, select and add their favorite game to collection from the game list of a selected genre
3. Since the user added a game that they like to collection, the system can now perform Favorites-based similarity and is carried as follows. 
   1. One is 'Recommended for you' where the system considers all games in users collection and returns a list of games similar to the collected games by using genre filtering.
   2. Second is 'Because you collected "This Game"' where the system randomly selects a game from users collection and returns a list of games using game filtering with genres similar to 'Recommended for you'.

### Additional context

- 20 games are returned in a game list
- Games are sorted by last modified time and date from timestamp in descending order
- Popular games are sorted based on rating and review count in descending order

### Code files used

| File name                                                | Description                                                                                                                                              |
|----------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|
| cortex/app/Actions/GetFavoriteGames.php                  | Used to return games based on all collected games                                                                                                        |
| cortex/app/Actions/GetPopularGames.php                   | Used to return popular games using rating count and average rating in descending order                                                                   |
| cortex/app/Actions/GetSimilarGames.php                   | Used to return games based on a randomly selected game from collection                                                                                   |
| cortex/app/Http/Controllers/RecommendationController.php | Controller used as part of the recommendation system to interface between backend and frontent                                                           |
| campus/lib/users.ts                                      | This file contains functions used for recommendation system which includes adding, removing and checking if a game is already added to collection or not |
| campus/app/page.tsx                                      | Used to display games recommended for users                                                                                                              |
| campus/app/game/\[gameid\]/page.tsx                        | Used to add games to collection                                                                                                                          |
| campus/app/(usermain)/user/page.tsx                      | Used to remove games from collection                                                                                                                     |
