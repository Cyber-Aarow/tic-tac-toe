
function Player(num){
    let score = 0;
    const value = num;
    const name = "Player " + num;

    const getValue = () => value;

    const getScore = () => score;

    const getName = () => name;
    return {
        getValue,
        getScore,
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

    const getWin = () => win;
    const getTie = () => tie;

    const playRound = (number) => {
        console.log(currentPlayer.getName() + "'s turn");
        manageChoice(number);
        printBoard();
        win = winCheck();
        if(win === 0){
            if(move_count === 9){
                tie = true;
                return "It's a tie!";
            }
            return "Round played.";
        }
        else if(win === 1) return "Player 1 wins!";
        else if(win === 2) return "Player 2 wins!";
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
            }
            else if((board[0] === board[1]) && (board[0] === board[2]) && (board[0] === 2)){
                win2 = true;
            }
        };
        const rowTwoCheck = () => {
            if((board[3] === board[4]) && (board[3] === board[5]) && (board[3] === 1)){
                win1 = true;
            }
            else if((board[3] === board[4]) && (board[3] === board[5]) && (board[3] === 2)){
                win2 = true;
            }
        };
        const rowThreeCheck = () => {
            if((board[6] === board[7]) && (board[6] === board[8]) && (board[6] === 1)){
                win1 = true;
            }
            else if((board[6] === board[7]) && (board[6] === board[8]) && (board[6] === 2)){
                win2 = true;
            }
        };
        //Columns
        const colOneCheck = () => {
            if((board[0] === board[3]) && (board[0] === board[6]) && (board[0] === 1)){
                win1 = true;
            }
            else if((board[0] === board[3]) && (board[0] === board[6]) && (board[0] === 2)){
                win2 = true;
            }
        };
        const colTwoCheck = () => {
            if((board[1] === board[4]) && (board[1] === board[7]) && (board[1] === 1)){
                win1 = true;
            }
            else if((board[1] === board[4]) && (board[1] === board[7]) && (board[1] === 2)){
                win2 = true;
            }
        };
        const colThreeCheck = () => {
            if((board[2] === board[5]) && (board[2] === board[8]) && (board[2] === 1)){
                win1 = true;
            }
            else if((board[2] === board[5]) && (board[2] === board[8]) && (board[2] === 2)){
                win2 = true;
            }
        };
        //Diagonals
        const diagLTRCheck = () => {
            if((board[0] === board[4]) && (board[0] === board[8]) && (board[0] === 1)){
                win1 = true;
            }
            else if((board[0] === board[4]) && (board[0] === board[8]) && (board[0] === 2)){
                win2 = true;
            }
        };
        const diagRTLCheck = () => {
            if((board[2] === board[4]) && (board[2] === board[6]) && (board[2] === 1)){
                win1 = true;
            }
            else if((board[2] === board[4]) && (board[2] === board[6]) && (board[2] === 2)){
                win2 = true;
            }
        };
        return runCheck();
    }

    return{
        printBoard,
        playRound,
        getWin,
        getTie,
        playRound
    };
})();
 
const DOM = (() => {
    
    const chooseLetter = (number) => {
        const p = document.createElement('p');
        if(number === 0){
            p.innerHTML = '#';
            p.style.opacity = '0';
        }
        else if(number === 1){
            p.innerHTML = 'X';
        }
        else if(number === 2){
            p.innerHTML = 'O';
        }
        return p;
    };

    const giveClick = (tile, number) => {
        tile.addEventListener('click', function(){
            console.log(Game.playRound(number));
        });       
    }

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
        const body = document.querySelector('body');
        body.innerHTML = '';
        body.appendChild(ul);
    };

    return{
        displayBoard
    };
})();

//Global code
DOM.displayBoard();

