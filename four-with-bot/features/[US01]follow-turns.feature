# [US01] As a user I want the application to follow the game rules, so that I can't cheat

Feature: As user I would like the app to detect all ways of winning. Horizontal, vertical & diagonal in two directions

  Background:
    Given that I goto the game page
    When I choose to play as two human players
    And with two different names
    And press the Börja spela-button
    Then the game should start

  Scenario: Change of turns
    When player 1 plays a bricks
    Then it should be player 2 turn
    And the turn should return to player 1