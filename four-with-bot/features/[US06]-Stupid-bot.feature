Feature:As a user I want the dumb bot to play worse than the normal bot
 
Background:
  Given that I got the game page
  When I choose a dumb bot to play against a normal bot
  And with two different names
  And press the Börja spela-button
  Then the game should start

  Scenario: Game 
  Then they should play 10 games against each other
  And the normal bot should win all games

  

