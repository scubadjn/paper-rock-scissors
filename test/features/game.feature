Feature: playing paper rock scissor

  @api
  Scenario Outline: game should be playable :)
    Given "playerA" creates a new game
    Then a link that can be shared should be created
    Then an other player should be able to retrive the game created by player "playerA"
    Then "playerB" should be able to join the game
    When "playerA" makes a move <playerAmoveR1>
    When "playerB" makes a move <playerBmoveR1>
    Then <winner> <result> the round
    When "playerA" makes a move "paper"
    When "playerB" makes a move "rock"
    Then "playerA" "win" the round
    When "playerA" makes a move "scissor"
    When "playerB" makes a move "rock"
    Then "playerB" "win" the round
    Then <gamewinner> wins the game

    Examples:
      | playerAmoveR1 | playerBmoveR1 | winner    | result | gamewinner |
      | "paper"       | "rock"        | "playerA" | "win"  | "playerA"  |
      | "paper"       | "paper"       | "playerA" | "draw" | "null"     |
      | "paper"       | "scissor"     | "playerB" | "win"  | "playerB"  |
      | "rock"        | "rock"        | "playerA" | "draw" | "null"     |
      | "rock"        | "paper"       | "playerB" | "win"  | "playerB"  |
      | "rock"        | "scissor"     | "playerA" | "win"  | "playerA"  |
      | "scissor"     | "rock"        | "playerB" | "win"  | "playerB"  |
      | "scissor"     | "paper"       | "playerA" | "win"  | "playerA"  |
      | "scissor"     | "scissor"     | "playerA" | "draw" | "null"     |

  @api
  Scenario: each player should only be able to play 1 time each round
    Given "playerA" creates a new game
    Then a link that can be shared should be created
    Then an other player should be able to retrive the game created by player "playerA"
    Then "playerB" should be able to join the game
    When "playerA" makes a move "paper"
    When "playerA" makes a move "paper"
    Then an error with code "403" with message "Waiting for other player."