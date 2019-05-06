# [US05] As a user I want the normal bot to have some randomness in its game choices, so that I can improve my own game
# Tomas

Feature: Check normal bot randomness

  Background: Human vs. normal bot, Game should start
    Given that I goto the game page
    When I choose to play as a human player vs. a normal bot
    And I enter two different names
    And I press the Börja spela-button
    Then the game should start

  Scenario: Game 1
    When I place my coins in a certain way
    Then the normal bot will place its coins in a certain way

   Scenario: Game 2
     When I place my coins the same way as the previous game
     Then the normal bot should vary his game choice



# Kör även normal bot vs normal bot?