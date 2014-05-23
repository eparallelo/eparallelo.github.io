function ticTacToe(id) {
    var ttt = {

        id : id,
        
        gameType : GameEnum.TIC_TAC_TOE,
        
        size : 3,

        currentPlayer : CellEnum.EMPTY,

        board : [
            [CellEnum.EMPTY, CellEnum.EMPTY, CellEnum.EMPTY],
            [CellEnum.EMPTY, CellEnum.EMPTY, CellEnum.EMPTY],
            [CellEnum.EMPTY, CellEnum.EMPTY, CellEnum.EMPTY]
        ],

        isCellEmpty : function(row, col) {
            return this.board[row][col] == CellEnum.EMPTY;
        },

        isCurrentTurn : function(player) {
            return currentPlayer == player;
        },
        
        tryPlayMove : function(player, toRow, toCol) {
            
            if (player == CellEnum.PLAYER_ONE || player == CellEnum.PLAYER_TWO) {
                if (this.isBoardActive()) {
                    if (this.isCellEmpty(toRow, toCol)) {
                        this.board[toRow][toCol] = player;
                        return true;
                    } else {
                        console.log("cell is not empty");
                    }
                } else {
                    console.log("can't play on a non-active board");
                }
            } else if (player == CellEnum.EMPTY) {
                console.log("playMove got empty player...");
            }
            else {
                console.log("playMove player was" + player);
            }
            
            return false;
        },

        getRowWinner : function(row) {
            if (this.board[row][0] == this.board[row][1] && this.board[row][0] == this.board[row][2]) {
                return this.board[row][0];
            }

            return CellEnum.EMPTY;
        },

        getColWinner : function(col) {
            if (this.board[0][col] == this.board[1][col] && this.board[0][col] == this.board[2][col]) {
                return this.board[0][col];
            }

            return CellEnum.EMPTY;
        },

        getDiagWinner : function() {
            if (this.board[0][0] == this.board[1][1] && this.board[0][0] == this.board[2][2]) {
                return this.board[0][0];
            } else if (this.board[0][2] == this.board[1][1] && this.board[0][2] == this.board[2][0]) {
                return this.board[0][2];
            }

            return CellEnum.EMPTY;
        },

        getWinner : function() {
            var winner = this.getDiagWinner(), i;
            if (winner != CellEnum.EMPTY) {
                return winner; // diagonal winner
            } else {
                for (i = 0; i < this.size; i += 1) {
                    winner = this.getRowWinner(i);
                    if (winner != CellEnum.EMPTY) {
                        return winner; // row winner
                    } else {
                        winner = this.getColWinner(i);
                        if (winner != CellEnum.EMPTY) {
                            return winner; // column winner
                        }
                    }
                }
            }

            return CellEnum.EMPTY; // no winner
        },

        isBoardActive : function() {
            return this.getWinner(this.board) == CellEnum.EMPTY;
        }
    }

    return ttt;
}