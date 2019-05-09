# [US06] As a user I want the dumb bot to play worse than the normal bot
# David

Feature:As a user I want the dumb bot to play worse than the normal bot
 
Background:
  Given that I goto the game page
  When I choose to play as a dumb bot player vs. a normal bot
  And with two different names
  And press the Börja spela-button
  Then the game should start

  Scenario: Game 
  Then they should play 3 games against each other
  And the normal bot should win all games

  

