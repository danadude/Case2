Feature: JSON-test
  Få denna jävla skiten att fungera, det är kul ... Men kl e mycket ><.
 
Background:
  Given that i goto the game pages
  When i choose to play as two human playerss
  And with two different namess
  And press the Börja spela-buttons
  Then the game should starts
 
Scenario: Horizontal win
  When the first player plays 4 bricks in a row horizontallys
  Then first player should wins