# [US05] As a user I want the normal bot to have some randomness in its game choices, so that I can improve my own game
# Tomas

Feature: Check normal bot randomness vs normal bot

  Background: normal vs. normal bot, Game should start
    Given that I goto the game page
    When I choose to play as a normal bot vs. a normal bot
    And I enter two bot names
    And I press the Börja spela-button
    Then the game should start

  Scenario: Game 1 - normal bot vs normal bot
    Then the normal bots will play a game against each other
    And take screen shot on bot vs bot Game outcome

  Scenario: Game 2 - normal bot vs normal bot
    Then the normal bots will play a game against each other
    And take screen shot on bot vs bot Game outcome

  Scenario: Game 3 - normal bot vs normal bot
    Then the normal bots will play a game against each other
    And take screen shot on bot vs bot Game outcome