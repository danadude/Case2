# [US06] As a user I want the dumb bot to play worse than the normal bot
# David

Feature:As a user I want the dumb bot to play worse than the normal bot
 
Background:
  Given that I goto the game page
  When I choose a dumb bot to play against a normal bot
  And with two different names
  And press the Börja spela-button
  Then the game should start

  Scenario: Game 1
  Then the normal bot should win against the dumb bot

    Scenario: Game 2
  Then the normal bot should win against the dumb bot

    Scenario: Game 3
  Then the normal bot should win against the dumb bot





  #fortsätt kolla fler matcher?