# [US02] As a user I want the application to pronounce a winner when 4 is connected, so that the winner can celebrate

Feature: As a user I want the application to pronounce a winner when 4 is connected, so that the winner can celebrate

  Background:
    Given that I goto the game page
    When I choose to play as two human players
    And with two different names
    And press the Börja spela-button
    Then the game should start

  Scenario: Horizontal win
    When the first player plays 4 bricks in a row horizontally
    Then he/she should win

  Scenario: Congratulating the winner
    When a player has played 4 bricks that connect either horizontaly, verticaly or diagonaly
    Then he/she should win
    And A message that congratulates the winner should be shown

  Scenario: Announcing a draw
    When the board is full
    And no winner can be declared
    Then a draw should be announced

  Scenario: Announcing a loss
    When one player has placed 4 bricks in row
    Then the losing player should be informed off the loss


