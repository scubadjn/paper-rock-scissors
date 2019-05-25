Feature: playing paper rock scissor

  @api
  Scenario Outline: game should be playable :)
    Given "playerA" creates a new game
    Then a link that can be shared should be created
    Then an other player should be able to retrive the game created by player "playerA"
    Then "playerB" try to join the game
    When "playerA" makes a move <playerAmoveR1>
    When "playerB" makes a move <playerBmoveR1>
    Then <winner> <result> the round
    When "playerA" makes a move "paper"
    When "playerB" makes a move "rock"
    Then "playerA" "win" the round
    When "playerA" makes a move "scissor"
    When "playerB" makes a move "rock"
    Then "playerB" "win" the round
    Then game should end if there is a <gamewinner> else restart


    Examples:
      | playerAmoveR1 | playerBmoveR1 | winner    | result | gamewinner |
      | "paper"       | "rock"        | "playerA" | "win"  | "playerA"  |
      | "paper"       | "paper"       | "playerA" | "draw" | "draw"     |
      | "paper"       | "scissor"     | "playerB" | "win"  | "playerB"  |
      | "rock"        | "rock"        | "playerA" | "draw" | "draw"     |
      | "rock"        | "paper"       | "playerB" | "win"  | "playerB"  |
      | "rock"        | "scissor"     | "playerA" | "win"  | "playerA"  |
      | "scissor"     | "rock"        | "playerB" | "win"  | "playerB"  |
      | "scissor"     | "paper"       | "playerA" | "win"  | "playerA"  |
      | "scissor"     | "scissor"     | "playerA" | "draw" | "draw"     |

  @api
  Scenario: game should be playable :)
    Given "playerA" creates a new game
    Then a link that can be shared should be created
    Then an other player should be able to retrive the game created by player "playerA"
    Then "playerB" try to join the game
    When "playerA" makes a move "paper"
    When "playerB" makes a move "rock"
    Then "playerA" "win" the round
    When "playerA" makes a move "paper"
    When "playerB" makes a move "rock"
    Then "playerA" "win" the round
    When "playerA" makes a move "scissor"
    When "playerB" makes a move "rock"
    Then "playerB" "win" the round
    When "playerA" makes a move "scissor"
    When "playerB" makes a move "rock"
    Then "playerB" "win" the round
    Then an error with code "403" with message "Game has ended."

  @api
  Scenario Outline: each player should only be able to play 1 time each round
    Given "playerA" creates a new game
    Then a link that can be shared should be created
    Then an other player should be able to retrive the game created by player "playerA"
    Then "playerB" try to join the game
    When "playerA" makes a move <move1>
    When "playerA" makes a move <move2>
    Then an error with code "403" with message "Waiting for other player."

    Examples:
      | move1     | move2     |
      | "paper"   | "rock"    |
      | "paper"   | "paper"   |
      | "paper"   | "scissor" |
      | "rock"    | "rock"    |
      | "rock"    | "paper"   |
      | "rock"    | "scissor" |
      | "scissor" | "rock"    |
      | "scissor" | "paper"   |
      | "scissor" | "scissor" |

  @api
  Scenario: player name much be uniq within a game
    Given "playerA" creates a new game
    Then a link that can be shared should be created
    Then an other player should be able to retrive the game created by player "playerA"
    Then "playerA" try to join the game
    Then an error with code "403" with message "Player name is taken."

  @api
  Scenario: players that are not in the game should not be able to make a move
    Given "playerA" creates a new game
    Then a link that can be shared should be created
    Then an other player should be able to retrive the game created by player "playerA"
    Then "playerB" try to join the game
    When "playerC" makes a move "rock"
    Then an error with code "403" with message "Invalid player name."
