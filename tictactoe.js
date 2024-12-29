
function Player(num){
    let score = 0;
    const value = num;
    const name = "Player " + num;

    const getValue = () => value;
    const addScore = () => score++;
    const getScore = () => score;

    const getName = () => name;
    return {
        getValue,
        getScore,
        addScore,
        getName
    };
}

const GameBoard = (() => {
    const board = [];
    for(let i = 0; i < 9; i++) board[i] = 0;
    //const _render = () =>{};


    const clearBoard = () =>{
        for(let i = 0; i < 9; i++) board[i] = 0;
    };

    const setBoard = (spot, value) =>{
        board[spot] = value;
        return "You have set " + spot + " to " + value;
    };

    const getBoard = () => board;

    return{
        clearBoard,
        setBoard,
        getBoard
    };
})();

const Game = (() =>{
    const player1 = Player(1);
    const player2 = Player(2);
    const players = [player1, player2];
    let currentPlayer = players[0];
    let choice = 0;
    let win = 0;
    let move_count = 0;
    let tie = false;
    let strikethrough_setter = 0;

    const getWin = () => win;
    const getTie = () => tie;
    const getPlayer1 = () => player1;
    const getPlayer2 = () => player2;
    const getStrikethrough = () => strikethrough_setter;

    const playRound = (number) => {
        console.log(currentPlayer.getName() + "'s turn");
        manageChoice(number);
        printBoard();
        win = winCheck();
        return handleWin();
    };

    const printBoard = () => {
        const board = GameBoard.getBoard();
        const row1 = board[0] + ' ' + board[1] + ' ' + board[2];
        const row2 = board[3] + ' ' + board[4] + ' ' + board[5];
        const row3 = board[6] + ' ' + board[7] + ' ' + board[8];
        console.log(row1 + '\n' + row2 + '\n' + row3);
    };
    
    const switchPlayer = () => {
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    };

    const setChoice = () => {
        GameBoard.setBoard(choice, currentPlayer.getValue());
    };
    const manageChoice = (number) => {
        choice = number;
        
        if(GameBoard.getBoard()[choice] === 0){
            setChoice();
            switchPlayer();
            DOM.displayBoard();
            move_count++;
        }
        else{
            console.log("Already taken. Try again.");
        }
    };

    function winCheck(){
        const board = GameBoard.getBoard();
        let win1 = false;
        let win2 = false;
        const runCheck = () => {
            rowOneCheck();
            rowTwoCheck();
            rowThreeCheck();
            colOneCheck();
            colTwoCheck();
            colThreeCheck();
            diagLTRCheck();
            diagRTLCheck();
            if(win1) return 1;
            else if(win2) return 2;
            else return 0;
        };

        //Rows
        const rowOneCheck = () => {
            if((board[0] === board[1]) && (board[0] === board[2]) && (board[0] === 1)){
                win1 = true;
                strikethrough_setter = 1;
            }
            else if((board[0] === board[1]) && (board[0] === board[2]) && (board[0] === 2)){
                win2 = true;
                strikethrough_setter = 1;
            }
        };
        const rowTwoCheck = () => {
            if((board[3] === board[4]) && (board[3] === board[5]) && (board[3] === 1)){
                win1 = true;
                strikethrough_setter = 2;
            }
            else if((board[3] === board[4]) && (board[3] === board[5]) && (board[3] === 2)){
                win2 = true;
                strikethrough_setter = 2;
            }
        };
        const rowThreeCheck = () => {
            if((board[6] === board[7]) && (board[6] === board[8]) && (board[6] === 1)){
                win1 = true;
                strikethrough_setter = 3;
            }
            else if((board[6] === board[7]) && (board[6] === board[8]) && (board[6] === 2)){
                win2 = true;
                strikethrough_setter = 3;
            }
        };
        //Columns
        const colOneCheck = () => {
            if((board[0] === board[3]) && (board[0] === board[6]) && (board[0] === 1)){
                win1 = true;
                strikethrough_setter = 4;
            }
            else if((board[0] === board[3]) && (board[0] === board[6]) && (board[0] === 2)){
                win2 = true;
                strikethrough_setter = 4;
            }
        };
        const colTwoCheck = () => {
            if((board[1] === board[4]) && (board[1] === board[7]) && (board[1] === 1)){
                win1 = true;
                strikethrough_setter = 5;
            }
            else if((board[1] === board[4]) && (board[1] === board[7]) && (board[1] === 2)){
                win2 = true;
                strikethrough_setter = 5;
            }
        };
        const colThreeCheck = () => {
            if((board[2] === board[5]) && (board[2] === board[8]) && (board[2] === 1)){
                win1 = true;
                strikethrough_setter = 6;
            }
            else if((board[2] === board[5]) && (board[2] === board[8]) && (board[2] === 2)){
                win2 = true;
                strikethrough_setter = 6;
            }
        };
        //Diagonals
        const diagLTRCheck = () => {
            if((board[0] === board[4]) && (board[0] === board[8]) && (board[0] === 1)){
                win1 = true;
                strikethrough_setter = 7;
            }
            else if((board[0] === board[4]) && (board[0] === board[8]) && (board[0] === 2)){
                win2 = true;
                strikethrough_setter = 7;
            }
        };
        const diagRTLCheck = () => {
            if((board[2] === board[4]) && (board[2] === board[6]) && (board[2] === 1)){
                win1 = true;
                strikethrough_setter = 8;
            }
            else if((board[2] === board[4]) && (board[2] === board[6]) && (board[2] === 2)){
                win2 = true;
                strikethrough_setter = 8;
            }
        };
        return runCheck();
    }

    const handleWin = () => {
        if(win === 0){
            if(move_count === 9){
                tie = true;
                DOM.displayScore();
                return "It's a tie!";
            }
            return "Round played.";
        }
        else if(win === 1) {
            player1.addScore();
            DOM.displayStrikethrough();
            DOM.displayScore();
            return "Player 1 wins!";
        }
        else if(win === 2) {
            player2.addScore();
            DOM.displayStrikethrough();
            DOM.displayScore();
            return "Player 2 wins!";
        }
    };

    const restartGame = () => {
        move_count = 0;
        win = 0;
        GameBoard.clearBoard();
        DOM.removeScore();
        DOM.displayBoard();
        DOM.removeStrikethrough();
    };
    return{
        printBoard,
        playRound,
        getWin,
        getTie,
        getPlayer1,
        getPlayer2,
        getStrikethrough,
        playRound,
        restartGame
    };
})();
 
const DOM = (() => {
    const body = document.querySelector('body');    

    const displayStartForm = () => {
        const form = document.createElement('form');
        const player1_input = document.createElement('input');
        const player2_input = document.createElement('input');
        const button = document.createElement('button');

        button.classList.add('start-button');
        giveStartClick(button);
        button.innerHTML = "Start Game";
        form.classList.add('start-form');

        form.appendChild(player1_input);
        form.appendChild(player2_input);
        form.appendChild(button);
        body.appendChild(form);
    };

    const removeStartForm = () => {
        form = document.querySelector('.start-form');
        form.remove();
    };

    const chooseLetter = (player_number) => {
        const p = document.createElement('p');
        if(player_number === 0){
            p.innerHTML = '#';
            p.style.opacity = '0';
        }
        else if(player_number === 1){
            p.innerHTML = 'X';
        }
        else if(player_number === 2){
            p.innerHTML = 'O';
        }
        return p;
    };

    const giveClick = (tile, number) => {
        tile.addEventListener('click', function(){
            console.log(Game.playRound(number));
        });       
    }

    const giveStartClick = (button) =>{
        button.addEventListener('click', function(){
            removeStartForm();
            displayBoard();
        });
    };

    const displayBoard = () => {
        const board = GameBoard.getBoard();
        const ul = document.createElement('ul');
        ul.classList.add('gameboard');
        for(let i = 0; i < board.length; i++){
            const li = document.createElement('li');
            li.classList.add('tile');
            li.classList.add('t' + i.toString());
            giveClick(li, i);
            li.appendChild(chooseLetter(board[i]));
            ul.appendChild(li);
        }
        body.innerHTML = '';
        body.appendChild(ul);
    };

    const displayScore = () => {
        const scoreboard = document.createElement('div');
        const top = document.createElement('div');
        const p1 = document.createElement('p');
        const dash = document.createElement('p');
        const p2 = document.createElement('p');
        const bottom = document.createElement('div');
        const restart = document.createElement('button');

        const overlay = document.createElement('div');
        
        scoreboard.classList.add('scoreboard');
        top.classList.add('top');
        p1.classList.add('score');
        dash.classList.add('score');
        p2.classList.add('score');
        bottom.classList.add('bottom');
        restart.classList.add('restart');

        overlay.classList.add('overlay');
        
        p1.innerHTML = Game.getPlayer1().getScore();
        dash.innerHTML = '-';
        p2.innerHTML = Game.getPlayer2().getScore();
        restart.innerHTML = "Play again?";

        restartFunction(restart);
        
        top.appendChild(p1);
        top.appendChild(dash);
        top.appendChild(p2);
        bottom.appendChild(restart);
        scoreboard.appendChild(top);
        scoreboard.appendChild(bottom);

        setTimeout(() => {
            body.appendChild(scoreboard);
        }, 2000);
        body.appendChild(overlay);
    }

    const removeScore = () => {
        const overlay = document.querySelector('.overlay');
        const scoreboard = document.querySelector('.scoreboard');
        body.removeChild(overlay);
        body.removeChild(scoreboard);
    }


    const restartFunction = (button) => {
        button.addEventListener('click', function(){
            Game.restartGame();
        });
    }

    const displayStrikethrough = () => {
        const line = document.createElement('div');
        line.classList.add('strikethrough');
        line.classList.add(`line${Game.getStrikethrough()}`);
        if((Game.getStrikethrough() >= 1) && (Game.getStrikethrough() <= 3)){
            line.classList.add('horizontal');
        }
        else if((Game.getStrikethrough() >= 4) && (Game.getStrikethrough() <= 6)){
            line.classList.add('vertical');
        }
        else if((Game.getStrikethrough() === 7) || (Game.getStrikethrough() === 8)){
            line.classList.add('diagonal');
        }
        body.appendChild(line);
    };

    const removeStrikethrough = () => {
        const line = querySelector('.strikethrough');
        body.removeChild(line);
    };
    return{
        displayBoard,
        displayStartForm,
        displayScore,
        removeScore,
        displayStrikethrough,
        removeStrikethrough
    };
})();

//Global code
DOM.displayStartForm();