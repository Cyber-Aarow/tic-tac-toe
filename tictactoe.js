var pubsub = require('pubsub.js');

const Player = (letter) => {
    let score = 0;
    function chooseSpot(number){

    }
    return {

    }
};

const Game = () => {
    pubsub.subscribe('win1', function(){
        console.log("Player 1 wins!");
    });
    pubsub.subscribe('win2', function(){
        console.log("Player 2 wins!");
    });

};

const GameBoard = () => {
    let board = [];

    function _render(){}

    function newBoard(){
        for(let i = 0; i < 9; i++) board.push(0);
    }

    function setBoard(id, player){
        board[id] = player;
    }
    
    function getBoard(){
        return board;
    }

    //Win Checks
    //Rows
    function rowOneCheck(){
        if(board[0] === board[1] === board[2] && board[0] === 1){
            pubsub.publish('win1');
        }
        else if(board[0] === board[1] === board[2] && board[0] === 1){
            pubsub.publish('win2');
        }
    }
    function rowTwoCheck(){
        if(board[3] === board[4] === board[5] && board[3] === 1){
            pubsub.publish('win1');
        }
        else if(board[3] === board[4] === board[5] && board[3] === 1){
            pubsub.publish('win2');
        }
    }
    function rowThreeCheck(){
        if(board[6] === board[7] === board[8] && board[6] === 1){
            pubsub.publish('win1');
        }
        else if(board[6] === board[7] === board[8] && board[6] === 1){
            pubsub.publish('win2');
        }
    }
    //Columns
    function colOneCheck(){
        if(board[0] === board[3] === board[6] && board[0] === 1){
            pubsub.publish('win1');
        }
        else if(board[0] === board[3] === board[6] && board[0] === 1){
            pubsub.publish('win2');
        }
    }
    function colTwoCheck(){
        if(board[1] === board[4] === board[7] && board[1] === 1){
            pubsub.publish('win1');
        }
        else if(board[1] === board[4] === board[7] && board[1] === 1){
            pubsub.publish('win2');
        }
    }
    function colThreeCheck(){
        if(board[2] === board[5] === board[8] && board[2] === 1){
            pubsub.publish('win1');
        }
        else if(board[2] === board[5] === board[8] && board[2] === 1){
            pubsub.publish('win2');
        }
    }
    //Diagonals
    function diagLTRCheck(){
        if(board[0] === board[4] === board[8] && board[0] === 1){
            pubsub.publish('win1');
        }
        else if(board[0] === board[4] === board[8] && board[0] === 1){
            pubsub.publish('win2');
        }
    }
    function diagRTLCheck(){
        if(board[2] === board[4] === board[6] && board[2] === 1){
            pubsub.publish('win1');
        }
        else if(board[2] === board[4] === board[6] && board[2] === 1){
            pubsub.publish('win2');
        }
    }
};