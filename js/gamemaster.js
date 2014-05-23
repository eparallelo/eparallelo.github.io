var CellEnum = {
    EMPTY : 0,
    PLAYER_ONE : 1,
    PLAYER_TWO : 2
};
Object.freeze(CellEnum);

var GameEnum = {
    TIC_TAC_TOE : 0,
    CONNECT_FOUR : 4
}
Object.freeze(GameEnum);

playerOneScore = 0;
playerTwoScore = 0;

var games = [];

function addGame(gameType, id) {
//    var id = games.length;
    if (gameType == GameEnum.TIC_TAC_TOE) {
        games.push(new ticTacToe(id));
        console.log("ttt");
    } else if (gameType == GameEnum.CONNECT_FOUR) {
        games.push(new connectFour(id));
        console.log("c4");
    }
}

function getTicTacToeDiv(ttt) {
    
}