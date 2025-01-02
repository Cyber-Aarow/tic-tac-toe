/**
 * Represents a player in the game with a numeric ID, a name, and a score count.
 * 
 * @param {number} num - The numeric identifier for this player (1 or 2 in typical tic-tac-toe).
 * @returns {Object} An object containing methods to get/update player info.
 */
const Player = (num) => {
  let score = 0;
  const value = num;
  const name = `Player ${num}`;

  const getValue = () => value;
  const addScore = () => { score++; };
  const getScore = () => score;
  const getName = () => name;

  return {
    getValue,
    getScore,
    addScore,
    getName
  };
};

/**
 * Encapsulates the game board logic (e.g., positions).
 * Future expansions might allow for NxN boards.
 */
const GameBoard = (() => {
  const TILE_COUNT = 9; // Typical 3x3 grid
  const board = Array(TILE_COUNT).fill(0);

  /**
   * Clears the board by setting all spots to 0.
   */
  const clearBoard = () => {
    for (let i = 0; i < TILE_COUNT; i++) {
      board[i] = 0;
    }
  };

  /**
   * Sets a spot on the board to a given value (e.g., 1 for 'X', 2 for 'O').
   * @param {number} spot - Index of the board (0 to 8).
   * @param {number} value - The player's numeric ID.
   * @returns {string} A debug string describing the action.
   */
  const setBoard = (spot, value) => {
    board[spot] = value;
    return `You have set spot ${spot} to ${value}`;
  };

  /**
   * Retrieves the current board array.
   * @returns {number[]} The board's state as an array of 9 integers.
   */
  const getBoard = () => board;

  return {
    clearBoard,
    setBoard,
    getBoard
  };
})();

/**
 * Main game logic module, controlling players, moves, and win detection.
 * 
 * Future expansions:
 * - Vary board sizes
 * - More advanced AI or player steps
 * - Networking for multiplayer
 */
const Game = (() => {
  const player1 = Player(1);
  const player2 = Player(2);
  const players = [player1, player2];
  let currentPlayer = players[0];

  let choice = 0;
  let win = 0;
  let moveCount = 0;
  let tie = false;
  let strikeIndex = 0;

  const getWin = () => win;
  const getTie = () => tie;
  const getPlayer1 = () => player1;
  const getPlayer2 = () => player2;
  const getStrikeIndex = () => strikeIndex;

  /**
   * Executes one round of play, given a board position.
   * @param {number} number - The board index chosen.
   * @returns {string} Some text describing the outcome or next step.
   */
  const playRound = (number) => {
    console.log(`${currentPlayer.getName()}'s turn`);
    manageChoice(number);
    printBoard();
    win = checkWin();
    return handleWin();
  };

  /**
   * Logs the board in a simple 3x3 text layout to the console.
   */
  const printBoard = () => {
    const board = GameBoard.getBoard();
    const row1 = `${board[0]} ${board[1]} ${board[2]}`;
    const row2 = `${board[3]} ${board[4]} ${board[5]}`;
    const row3 = `${board[6]} ${board[7]} ${board[8]}`;
    console.log(`${row1}\n${row2}\n${row3}`);
  };

  /**
   * Switches the currentPlayer from player1 to player2 or vice versa.
   */
  const switchPlayer = () => {
    currentPlayer = (currentPlayer === players[0]) ? players[1] : players[0];
  };

  /**
   * Sets the chosen spot on the board to currentPlayer's value.
   */
  const setChoice = () => {
    GameBoard.setBoard(choice, currentPlayer.getValue());
  };

  /**
   * Manages the chosen spot if it's free, otherwise reports "Already taken."
   * @param {number} number - The index on the board.
   */
  const manageChoice = (number) => {
    choice = number;
    if (GameBoard.getBoard()[choice] === 0) {
      setChoice();
      switchPlayer();
      DOM.displayBoard(); // refresh UI
      moveCount++;
    } else {
      console.log("Already taken. Try again.");
    }
  };

  /**
   * Checks for a win using 8 possible lines (3 rows, 3 cols, 2 diagonals).
   * 
   * @returns {number} 0 if no winner, 1 if player1 wins, 2 if player2 wins.
   */
  function checkWin() {
    const board = GameBoard.getBoard();
    let win1 = false;
    let win2 = false;

    // We'll define short closures for each line check:
    const row1Check = () => lineCheck([0,1,2], 1, 1) || lineCheck([0,1,2], 2, 1);
    const row2Check = () => lineCheck([3,4,5], 1, 2) || lineCheck([3,4,5], 2, 2);
    const row3Check = () => lineCheck([6,7,8], 1, 3) || lineCheck([6,7,8], 2, 3);
    const col1Check = () => lineCheck([0,3,6], 1, 4) || lineCheck([0,3,6], 2, 4);
    const col2Check = () => lineCheck([1,4,7], 1, 5) || lineCheck([1,4,7], 2, 5);
    const col3Check = () => lineCheck([2,5,8], 1, 6) || lineCheck([2,5,8], 2, 6);
    const diagLTRCheck = () => lineCheck([0,4,8], 1, 7) || lineCheck([0,4,8], 2, 7);
    const diagRTLCheck = () => lineCheck([2,4,6], 1, 8) || lineCheck([2,4,6], 2, 8);

    const runCheck = () => {
      row1Check(); row2Check(); row3Check();
      col1Check(); col2Check(); col3Check();
      diagLTRCheck(); diagRTLCheck();

      if (win1) return 1;
      if (win2) return 2;
      return 0;
    };

    /**
     * General line check for a specific combination of indexes.
     * If the given indexes all hold 'val' (1 or 2), we set the 'winX' flag and 'strikeIndex'.
     *
     * @param {number[]} indexes - The board indexes to check.
     * @param {number} val - The player's numeric ID (1 or 2).
     * @param {number} lineRef - The strikethrough code (1..8).
     */
    const lineCheck = (indexes, val, lineRef) => {
      if (
        board[indexes[0]] === val &&
        board[indexes[1]] === val &&
        board[indexes[2]] === val
      ) {
        strikeIndex = lineRef;
        if (val === 1) win1 = true; 
        else win2 = true; 
        return true;
      }
      return false;
    };

    return runCheck();
  }

  /**
   * Called after each move to determine if a player has won or if it's a tie.
   * @returns {string} A text message describing the outcome.
   */
  const handleWin = () => {
    if (win === 0) {
      if (moveCount === 9) {
        tie = true;
        DOM.displayScore(); // Overlays final result
        return "It's a tie!";
      }
      return "Round played.";
    } else if (win === 1) {
      player1.addScore();
      DOM.displayStrikethrough();
      DOM.displayScore();
      return "Player 1 wins!";
    } else if (win === 2) {
      player2.addScore();
      DOM.displayStrikethrough();
      DOM.displayScore();
      return "Player 2 wins!";
    }
  };

  /**
   * Resets game state and UI for a new session.
   */
  const restartGame = () => {
    moveCount = 0;
    win = 0;
    tie = false;
    GameBoard.clearBoard();
    DOM.removeScore();
    DOM.displayBoard();
    DOM.removeStrikethrough();
  };

  return {
    printBoard,
    playRound,
    getWin,
    getTie,
    getPlayer1,
    getPlayer2,
    getStrikethrough: getStrikeIndex,
    restartGame
  };
})();

/**
 * A module for DOM manipulation:
 *  - Renders the initial start form
 *  - Displays the main game board
 *  - Updates scoreboard & strikethrough lines
 */
const DOM = (() => {
  const body = document.querySelector('body');

  /**
   * Displays a form to set up the game (can be extended with player names, for instance).
   */
  const displayStartForm = () => {
    const form = document.createElement('form');
    const player1Input = document.createElement('input');
    const player2Input = document.createElement('input');
    const button = document.createElement('button');

    button.classList.add('start-button');
    button.textContent = "Start Game";
    form.classList.add('start-form');

    // Optional: label placeholders
    player1Input.placeholder = "Player 1 name (optional)";
    player2Input.placeholder = "Player 2 name (optional)";

    form.appendChild(player1Input);
    form.appendChild(player2Input);
    form.appendChild(button);
    body.appendChild(form);

    button.addEventListener('click', (event) => {
      event.preventDefault();
      removeStartForm();
      displayBoard();
    });
  };

  /**
   * Removes the start form from DOM.
   */
  const removeStartForm = () => {
    const form = document.querySelector('.start-form');
    if (form) {
      form.remove();
    }
  };

  /**
   * Returns an element (p) containing the letter or symbol: blank for 0, X for 1, O for 2.
   * 
   * @param {number} playerNumber - 0, 1, or 2.
   * @returns {HTMLParagraphElement} A paragraph containing the symbol.
   */
  const createSymbolElement = (playerNumber) => {
    const p = document.createElement('p');
    if (playerNumber === 0) {
      p.textContent = '#';
      p.style.opacity = '0';
    } else if (playerNumber === 1) {
      p.textContent = 'X';
    } else if (playerNumber === 2) {
      p.textContent = 'O';
    }
    return p;
  };

  /**
   * Renders the entire board as a UL of 9 LIs, each clickable.
   */
  const displayBoard = () => {
    const board = GameBoard.getBoard();
    const ul = document.createElement('ul');
    ul.classList.add('gameboard');

    board.forEach((val, i) => {
      const li = document.createElement('li');
      li.classList.add('tile', `t${i}`);
      li.appendChild(createSymbolElement(val));

      li.addEventListener('click', () => {
        console.log(Game.playRound(i));
      });

      ul.appendChild(li);
    });

    body.innerHTML = '';
    body.appendChild(ul);
  };

  /**
   * Displays a scoreboard overlay, showing the current score of each player and a "Play again?" button.
   */
  const displayScore = () => {
    const scoreboard = document.createElement('div');
    const top = document.createElement('div');
    const scoreP1 = document.createElement('p');
    const dash = document.createElement('p');
    const scoreP2 = document.createElement('p');
    const bottom = document.createElement('div');
    const restart = document.createElement('button');
    const overlay = document.createElement('div');

    scoreboard.classList.add('scoreboard');
    top.classList.add('top');
    scoreP1.classList.add('score');
    dash.classList.add('score');
    scoreP2.classList.add('score');
    bottom.classList.add('bottom');
    restart.classList.add('restart');
    overlay.classList.add('overlay');

    scoreP1.textContent = Game.getPlayer1().getScore();
    dash.textContent = '-';
    scoreP2.textContent = Game.getPlayer2().getScore();
    restart.textContent = "Play again?";

    // Attach event for the restart button
    restart.addEventListener('click', () => {
      Game.restartGame();
    });

    top.append(scoreP1, dash, scoreP2);
    bottom.appendChild(restart);
    scoreboard.append(top, bottom);

    setTimeout(() => {
      body.appendChild(scoreboard);
    }, 2000); // slight delay for dramatic effect?

    body.appendChild(overlay);
  };

  /**
   * Removes scoreboard and overlay from the DOM.
   */
  const removeScore = () => {
    const overlay = document.querySelector('.overlay');
    const scoreboard = document.querySelector('.scoreboard');
    if (overlay) body.removeChild(overlay);
    if (scoreboard) body.removeChild(scoreboard);
  };

  /**
   * Displays a strikethrough line based on the winning combo index. 
   * (1..3 for rows, 4..6 for cols, 7..8 for diagonals).
   */
  const displayStrikethrough = () => {
    const line = document.createElement('div');
    line.classList.add('strikethrough', `line${Game.getStrikethrough()}`);

    const st = Game.getStrikethrough();
    if (st >= 1 && st <= 3) {
      line.classList.add('horizontal');
    } else if (st >= 4 && st <= 6) {
      line.classList.add('vertical');
    } else if (st === 7 || st === 8) {
      line.classList.add('diagonal');
    }
    body.appendChild(line);
  };

  /**
   * Removes the strikethrough line from the DOM if present.
   */
  const removeStrikethrough = () => {
    const line = document.querySelector('.strikethrough');
    if (line) {
      body.removeChild(line);
    }
  };

  return {
    displayStartForm,
    displayBoard,
    displayScore,
    removeScore,
    displayStrikethrough,
    removeStrikethrough
  };
})();

// Global code: start up the UI with the initial form
DOM.displayStartForm();
