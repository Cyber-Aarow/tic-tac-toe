const Player = (letter) => {
    let score = 0;
    return {

    }
};

const Game = () => {

};

const GameBoard = () => {
    let board = [];

    function _render(){}

    function newBoard(){
        for(let i = 0; i < 9; i++) board.push(0);
    }

    //Win Checks
    //Rows
    function rowOneCheck(){
        if(board[0] === board[1] === board[2] && board[0] === 1){
            EventSource.emit('win1');
        }
        else if(board[0] === board[1] === board[2] && board[0] === 1){
            EventSource.emit('win2');
        }
    }
    function rowTwoCheck(){
        if(board[3] === board[4] === board[5] && board[3] === 1){
            EventSource.emit('win1');
        }
        else if(board[3] === board[4] === board[5] && board[3] === 1){
            EventSource.emit('win2');
        }
    }
    function rowThreeCheck(){
        if(board[6] === board[7] === board[8] && board[6] === 1){
            EventSource.emit('win1');
        }
        else if(board[6] === board[7] === board[8] && board[6] === 1){
            EventSource.emit('win2');
        }
    }
    //Columns
    function colOneCheck(){
        if(board[0] === board[3] === board[6] && board[0] === 1){
            EventSource.emit('win1');
        }
        else if(board[0] === board[3] === board[6] && board[0] === 1){
            EventSource.emit('win2');
        }
        
    }
    function colTwoCheck(){
        if(board[1] === board[4] === board[7] && board[1] === 1){
            EventSource.emit('win1');
        }
        else if(board[1] === board[4] === board[7] && board[1] === 1){
            EventSource.emit('win2');
        }
    }
    function colThreeCheck(){
        if(board[2] === board[5] === board[8] && board[2] === 1){
            EventSource.emit('win1');
        }
        else if(board[2] === board[5] === board[8] && board[2] === 1){
            EventSource.emit('win2');
        }
    }
    //Diagonals
    function diagLTRCheck(){
        if(board[0] === board[4] === board[8] && board[0] === 1){
            EventSource.emit('win1');
        }
        else if(board[0] === board[4] === board[8] && board[0] === 1){
            EventSource.emit('win2');
        }
    }
    function diagRTLCheck(){
        if(board[2] === board[4] === board[6] && board[2] === 1){
            EventSource.emit('win1');
        }
        else if(board[2] === board[4] === board[6] && board[2] === 1){
            EventSource.emit('win2');
        }
    }
};