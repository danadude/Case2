Feature: As a user I want the application to pronounce a winner when 4 is connected, so that the winner can celebrate

Background: 
    Given that http://localhost:3000/game loaded properly
    And that player 1 is a human
    And that player 2 is a human
    When the play game button is pressed
    Then the game starts

Scenario: Horizontal win
  When the first player plays 4 bricks in a row horizontally
  Then he/she should win
 
Scenario: Vertical win
  When the first player plays 4 bricks in a row vertical
  Then he/she should win
 
Scenario: Diagonal win (left to right)
  When the first player plays 4 bricks in a diagonally (left to right)
  Then he/she should win
 
Scenario: Diagonal win (right to left)
  When the first player plays 4 bricks in a diagonally (right to left)
  Then he/she should win

Scenario: Congratulating the winner
    When a player has played 4 bricks that connect either horizontaly, verticaly or diagonaly
    Then that player should win
    And A message that congratulates the winner should be shown



