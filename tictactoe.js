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
    /*pubsub.subscribe('win1', function(){
        console.log("Player 1 wins!");
    });
    pubsub.subscribe('win2', function(){
        console.log("Player 2 wins!");
    });*/
    const gameboard = GameBoard();
 
    const player1 = Player(1);
    const player2 = Player(2);
    const players = [player1, player2];
    let currentPlayer = players[1];
    let choice;

    const printBoard = () => {
        const board = gameboard.getBoard();
        const row1 = board[0] + ' ' + board[1] + ' ' + board[2];
        const row2 = board[3] + ' ' + board[4] + ' ' + board[5];
        const row3 = board[6] + ' ' + board[7] + ' ' + board[8];
        console.log(row1 + '\n' + row2 + '\n' + row3);
    };
    
    const switchPlayer = () => {
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    };
    const getChoice = () => {
        prompt(currentPlayer.getName() + "'s turn");
    };
    const setChoice = () => {
        gameboard.setBoard(choice, currentPlayer.getValue());
    };
    const playRound = () => {
        printBoard();
        switchPlayer();
        choice = getChoice();
        setChoice();
        return "Round played."
    };
    return{
        playRound
    };
}
const newgame = Game();

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
   /* //Win Checks
    //Rows
    const rowOneCheck {
        if(board[0] === board[1] === board[2] && board[0] === 1){
            pubsub.publish('win1');
        }
        else if(board[0] === board[1] === board[2] && board[0] === 1){
            pubsub.publish('win2');
        }
    };
    const rowTwoCheck {
        if(board[3] === board[4] === board[5] && board[3] === 1){
            pubsub.publish('win1');
        }
        else if(board[3] === board[4] === board[5] && board[3] === 1){
            pubsub.publish('win2');
        }
    };
    const rowThreeCheck {
        if(board[6] === board[7] === board[8] && board[6] === 1){
            pubsub.publish('win1');
        }
        else if(board[6] === board[7] === board[8] && board[6] === 1){
            pubsub.publish('win2');
        }
    };
    //Columns
    const colOneCheck {
        if(board[0] === board[3] === board[6] && board[0] === 1){
            pubsub.publish('win1');
        }
        else if(board[0] === board[3] === board[6] && board[0] === 1){
            pubsub.publish('win2');
        }
    };
    const colTwoCheck {
        if(board[1] === board[4] === board[7] && board[1] === 1){
            pubsub.publish('win1');
        }
        else if(board[1] === board[4] === board[7] && board[1] === 1){
            pubsub.publish('win2');
        }
    };
    const colThreeCheck {
        if(board[2] === board[5] === board[8] && board[2] === 1){
            pubsub.publish('win1');
        }
        else if(board[2] === board[5] === board[8] && board[2] === 1){
            pubsub.publish('win2');
        }
    };
    //Diagonals
    const diagLTRCheck {
        if(board[0] === board[4] === board[8] && board[0] === 1){
            pubsub.publish('win1');
        }
        else if(board[0] === board[4] === board[8] && board[0] === 1){
            pubsub.publish('win2');
        }
    };
    const diagRTLCheck {
        if(board[2] === board[4] === board[6] && board[2] === 1){
            pubsub.publish('win1');
        }
        else if(board[2] === board[4] === board[6] && board[2] === 1){
            pubsub.publish('win2');
        }
    };*/
