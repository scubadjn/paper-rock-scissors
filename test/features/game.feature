Feature: playing paper rock scissor
  
  @api
  Scenario: game should be playable :)
    Given "firstPlayer" creates a new game
    Then a link that can be shared should be created
    Then an other player should be able to retrive the game created by player "firstPlayer"
    Then "secondPlayer" should be able to join the game
    When "firstPlayer" makes a move "rock"
    When "secondPlayer" makes a move "rock"
    Then the round should be "draw"
    When "firstPlayer" makes a move "rock"
    When "secondPlayer" makes a move "paper"
    Then "firstPlayer" "lost" the round
    When "firstPlayer" makes a move "paper"
    When "secondPlayer" makes a move "rock"
    Then "firstPlayer" "win" the round
    When "secondPlayer" makes a move "scissor"
    When "firstPlayer" makes a move "rock"
    Then "firstPlayer" "win" the round
    Then "firstPlayer" wins the game