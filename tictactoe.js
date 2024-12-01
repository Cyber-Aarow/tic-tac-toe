//let pubsub = require('pubsub.js');
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

function Game(){
    const gameBoard = GameBoard();
    const player1 = Player(1);
    const player2 = Player(2);
    const players = [player1, player2];
    let currentPlayer = players[1];
    let choice = 0;
    let win = 0;

    const playRound = () => {
        printBoard();
        switchPlayer();
        manageChoice();
        win = winCheck();
        if(win === 0) return "Round played.";
        else if(win === 1) return "Player 1 wins!";
        else if(win === 2) return "Player 2 wins!";
    };
    const printBoard = () => {
        const board = gameBoard.getBoard();
        const row1 = board[0] + ' ' + board[1] + ' ' + board[2];
        const row2 = board[3] + ' ' + board[4] + ' ' + board[5];
        const row3 = board[6] + ' ' + board[7] + ' ' + board[8];
        console.log(row1 + '\n' + row2 + '\n' + row3);
    };
    
    const switchPlayer = () => {
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    };
    const makeChoice = () => {
        choice = prompt(currentPlayer.getName() + "'s turn");
    };
    const setChoice = () => {
        gameBoard.setBoard(choice, currentPlayer.getValue());
    };
    const manageChoice = () => {
        makeChoice();
        if(gameBoard.getBoard()[choice] === 0)
            setChoice();
        else{
            console.log("Already taken. Try again.");
            manageChoice();
        }
    };
    function winCheck(){
        console.log("winCheck Active");
        const board = gameBoard.getBoard();
        let win1 = false;
        let win2 = false;
        const runCheck = () => {
            console.log("runCheck Active");
            rowOneCheck();
            rowTwoCheck();
            rowThreeCheck();
            colOneCheck();
            colTwoCheck();
            colThreeCheck();
            diagLTRCheck();
            diagRTLCheck();
            console.log(win1);
            console.log(board[0] + board[1] + board[2]);
            if(win1) return 1;
            else if(win2) return 2;
            else return 0;
        };

        //Rows
        const rowOneCheck = () => {
            if((board[0] === board[1]) && (board[0] === board[2]) && (board[0] === 1)){
                win1 = true;
            }
            else if((board[0] === board[1]) && (board[0] === board[2]) && (board[0] === 1)){
                win2 = true;
            }
        };
        const rowTwoCheck = () => {
            if((board[3] === board[4]) && (board[3] === board[5]) && (board[3] === 1)){
                win1 = true;
            }
            else if((board[3] === board[4]) && (board[3] === board[5]) && (board[3] === 1)){
                win2 = true;
            }
        };
        const rowThreeCheck = () => {
            if((board[6] === board[7]) && (board[6] === board[8]) && (board[6] === 1)){
                win1 = true;
            }
            else if((board[6] === board[7]) && (board[6] === board[8]) && (board[6] === 1)){
                win2 = true;
            }
        };
        //Columns
        const colOneCheck = () => {
            if((board[0] === board[3]) && (board[0] === board[6]) && (board[0] === 1)){
                win1 = true;
            }
            else if((board[0] === board[3]) && (board[0] === board[6]) && (board[0] === 1)){
                win2 = true;
            }
        };
        const colTwoCheck = () => {
            if((board[1] === board[4]) && (board[1] === board[7]) && (board[1] === 1)){
                win1 = true;
            }
            else if((board[1] === board[4]) && (board[1] === board[7]) && (board[1] === 1)){
                win2 = true;
            }
        };
        const colThreeCheck = () => {
            if((board[2] === board[5]) && (board[2] === board[8]) && (board[2] === 1)){
                win1 = true;
            }
            else if((board[2] === board[5]) && (board[2] === board[8]) && (board[2] === 1)){
                win2 = true;
            }
        };
        //Diagonals
        const diagLTRCheck = () => {
            if((board[0] === board[4]) && (board[0] === board[8]) && (board[0] === 1)){
                win1 = true;
            }
            else if((board[0] === board[4]) && (board[0] === board[8]) && (board[0] === 1)){
                win2 = true;
            }
        };
        const diagRTLCheck = () => {
            if((board[2] === board[4]) && (board[2] === board[6]) && (board[2] === 1)){
                win1 = true;
            }
            else if((board[2] === board[4]) && (board[2] === board[6]) && (board[2] === 1)){
                win2 = true;
            }
        };
        return runCheck();
    }

    return{
        printBoard,
        playRound
    };
}

function GameBoard(){
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
}
const game = Game();
    

