Feature: follow rules
  As user I would like the app to detect all ways of winning (horizantal, vertical, diagonal in two directions).
 
Background:
  Given that I goto the game page
  When I choose to play as two human players
  And with two different names
  And press the Börja spela-button
  Then the game should start
 
Scenario: Change of turns
  When "player 1" plays a bricks
  Then it should be "player 2" turn