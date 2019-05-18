Feature: playing paper rock scissor
  
  @api
  Scenario: game should be playable :)
    Given "firstPlayer" creates a new game
    Then a link that can be shared should be created
    Then "secondPlayer" should be able to retrive the game created by player "firstPlayer" and join
    When "firstPlayer" makes a move "rock"
    When "secondPlayer" makes a move "rock"
    Then the round should be "draw"
    When "firstPlayer" makes a move "paper"
    When "secondPlayer" makes a move "rock"
    Then "firstPlayer" "wins" the round
    When "secondPlayer" makes a move "scissor"
    When "firstPlayer" makes a move "rock"
    Then "firstPlayer" "wins" the round
    When "firstPlayer" makes a move "paper"
    When "secondPlayer" makes a move "scissor"
    Then "secondPlayer" "wins" the round
    Then the game ends with "firstPlayer" as the "winner"