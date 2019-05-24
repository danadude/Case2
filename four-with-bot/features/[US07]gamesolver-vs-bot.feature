# [US07] As a user I want to know how good this application's bots is compared to other applications

Feature: Gamesolver versus four with bot
  Check that the perfect bot (gamesolver)
  always wins (will work if our bot is not perfect)

  Background:
    Given that I goto the game page
    When I choose to play as a bot and a human
    And with two different names
    And press the Börja spela-button
    Then the game should start

  Scenario:
    Given that we are on the gamesolver page
    When I choose to play as human and bot in the gamesolver
    When two bots have played until someone wins
    Then the gamesolver bot should always win