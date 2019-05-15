Feature: Detect win
  As user I would like the app to detect all ways of winning (horizantal, vertical, diagonal in two directions).
 
Background:
  Given that I goto the game page
  When I choose to play as two human players
  And with two different names
  And press the Börja spela-button
  Then the game should start
 
Scenario: Horizontal win
  When the first player plays 4 bricks in a row horizontally
  Then first player should win
 
Scenario: Vertical win
  When the first player plays 4 bricks in a row vertical
  Then first player should win
 
Scenario: Diagonal win (left to right)
  When the first player plays 4 bricks in a diagonally (left to right)
  Then first player should win
 
Scenario: Diagonal win (right to left)
  When the first player plays 4 bricks in a diagonally (right to left)
  Then first player should win

  Scenario: Second horizontal win
  When the second player plays 4 bricks in a row horizontally
  Then second player should win
 
Scenario: Second vertical win
  When the second player plays 4 bricks in a row vertical
  Then second player should win
 
Scenario: Second diagonal win (left to right)
  When the second player plays 4 bricks in a diagonally (left to right)
  Then second player should win
 
Scenario: Second diagonal win (right to left)
  When the second player plays 4 bricks in a diagonally (right to left)
  Then second player should win
