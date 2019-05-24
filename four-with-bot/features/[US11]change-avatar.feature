# [US11] As a user I want to be able to change the avatar, so i can look the way i want too

Feature: change avatar
  As user I would like to change the avatar image
 
Background:
  Given that I goto the game page
  When I choose to play as two human players
  And with two different names

  Scenario: change avatar
  When i change the avatars
  And press the Börja spela-button
  Then the game should start
  And i should have the new avatars
  

  