var colors = ['#00b080', '#b04040', '#0080b0'];
var currentPlayer = CellEnum.EMPTY; // (0, 1, 2) = (green, red, blue) = (empty, player1, player2)
    
$(document).ready(function () {
    
    addGame(GameEnum.TIC_TAC_TOE, 1);
    addGame(GameEnum.TIC_TAC_TOE, 2);
    addGame(GameEnum.CONNECT_FOUR, 3);
    addGame(GameEnum.TIC_TAC_TOE, 4);
    addGame(GameEnum.TIC_TAC_TOE, 5);
    
    function cleanFinished(game) {
        
        if (game) {
            console.log("active = " + game.isBoardActive());
            if (!game.isBoardActive()) {
                $("#" + game.id).animate({
                    opacity: 0.20
                }, 1000 );
                if (currentPlayer == CellEnum.PLAYER_ONE) {
                    playerOneScore++;
                    $(".player-one-score").text(playerOneScore);
                } else if (currentPlayer == CellEnum.PLAYER_TWO) {
                    playerTwoScore++;
                    $(".player-two-score").text(playerTwoScore);
                }
                
            }
        } else {
            console.log("nogame - " + JSON.stringify(game));
        }
        anime();
    }
    
    $(".grid-cell").click(function () {
        var cellid = $(this).attr('id');
        var splitCell = cellid.split("-");
        var boardIndex = splitCell[0];
        console.log(boardIndex);
        var row = splitCell[1] - 1;
        var col = splitCell[2] - 1;

        var game = games[boardIndex - 1];
        console.log(JSON.stringify(game));
        if (game.gameType == GameEnum.TIC_TAC_TOE) {
            console.log("game is tic-tac-toe");
            if (game.tryPlayMove(currentPlayer, row, col)) {
                console.log("try play success of player : " + JSON.stringify(currentPlayer));
                if (currentPlayer == CellEnum.PLAYER_ONE) {
                    $("#"+cellid).addClass("player-one", 1000);
                } else if (currentPlayer == CellEnum.PLAYER_TWO) {
                    $("#"+cellid).addClass("player-two", 1000);
                }

                cleanFinished(game);
            }
        } else if (game.gameType == GameEnum.CONNECT_FOUR) {
            console.log("game is connect four");
            var nextEmptyRow = game.getNextEmptyRowInColumn(row, col);
            var newCellid = "" + boardIndex + "-" + (nextEmptyRow+1) + "-" + (col+1);

            if (game.tryPlayMove(currentPlayer, row, col)) {
                console.log("last: " + game.lastMoveRow);
                var newCellid = "" + boardIndex + "-" + (game.lastMoveRow+1) + "-" + (col+1);
                if (currentPlayer == CellEnum.PLAYER_ONE) {
                    $("#"+newCellid).addClass("player-one-connect-four", 1000);
                } else if (currentPlayer == CellEnum.PLAYER_TWO) {
                    $("#"+newCellid).addClass("player-two-connect-four", 1000);
                }
                cleanFinished(game);
            } else {
                console.log("did not play move");
            }
        }
        
        

        console.log("click ended, current player is: " + currentPlayer);
    });
        
    function anime() {
        var i = 3 - currentPlayer; // 2 to 0, 1 to 1, 0 to 2 (empty stays empty, players switch)
        $('.container:before').animate({
            opacity: 0.5
        }, 500 );
        $('.container').animate({
            backgroundColor: colors[i]
        }, 500 );
        $('.container:after').animate({
            opacity: 1
        }, 500 );
        currentPlayer = i;
        console.log("anime current player is " + currentPlayer);
        restartTime();
    }
    
//    currentPlayer = Math.floor(1 + 2 * Math.random());
//    console.log("current player was randomly selected to be: " + currentPlayer);
    
    var time, targetTime, delay = 100;
    
    function restartTime() {
        time = new Date().getTime();
        targetTime = time + 10000;
        console.log(time);
        console.log(targetTime);
    }
    function updateTimer() {
        var txt = "", secs, millis;
        var diff = targetTime - time;
        if (diff <= 0) {
            txt = "00.0";
            anime();
        } else {
            var secs = Math.floor(diff / 1000);
            if (secs < 10) {
                txt  = "0";
            }
            txt += secs + ".";
            millis = Math.floor((diff - 1000*secs) / 100);
            txt += millis;
        }

        time = new Date().getTime();
        $(".timer").text(txt);
        setTimeout(updateTimer, delay);
    }
    
    $(".restart-button").click(function () {
        currentPlayer = Math.floor(1 + 2 * Math.random());
        console.log("current player was randomly selected to be: " + currentPlayer);
        anime();
        updateTimer();
    });
    
    
});

//function Gamemaster(size, InputManager, Actuator, StorageManager) {
//  this.size           = size; // Size of the grid
//  this.inputManager   = new InputManager;
//  this.storageManager = new StorageManager;
//  this.actuator       = new Actuator;
//
//  this.startTiles     = 2;
//
//  this.inputManager.on("move", this.move.bind(this));
//  this.inputManager.on("restart", this.restart.bind(this));
//  this.inputManager.on("keepPlaying", this.keepPlaying.bind(this));
//
//  this.setup();
//}