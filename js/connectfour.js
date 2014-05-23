function connectFour(id) {
    var c4 = {

        id : id,
        
        gameType : GameEnum.CONNECT_FOUR,
        
        size : 7,

        currentPlayer : CellEnum.EMPTY,

        board : [
            [CellEnum.EMPTY, CellEnum.EMPTY, CellEnum.EMPTY, CellEnum.EMPTY, CellEnum.EMPTY, CellEnum.EMPTY, CellEnum.EMPTY],
            [CellEnum.EMPTY, CellEnum.EMPTY, CellEnum.EMPTY, CellEnum.EMPTY, CellEnum.EMPTY, CellEnum.EMPTY, CellEnum.EMPTY],
            [CellEnum.EMPTY, CellEnum.EMPTY, CellEnum.EMPTY, CellEnum.EMPTY, CellEnum.EMPTY, CellEnum.EMPTY, CellEnum.EMPTY],
            [CellEnum.EMPTY, CellEnum.EMPTY, CellEnum.EMPTY, CellEnum.EMPTY, CellEnum.EMPTY, CellEnum.EMPTY, CellEnum.EMPTY],
            [CellEnum.EMPTY, CellEnum.EMPTY, CellEnum.EMPTY, CellEnum.EMPTY, CellEnum.EMPTY, CellEnum.EMPTY, CellEnum.EMPTY],
            [CellEnum.EMPTY, CellEnum.EMPTY, CellEnum.EMPTY, CellEnum.EMPTY, CellEnum.EMPTY, CellEnum.EMPTY, CellEnum.EMPTY],
            [CellEnum.EMPTY, CellEnum.EMPTY, CellEnum.EMPTY, CellEnum.EMPTY, CellEnum.EMPTY, CellEnum.EMPTY, CellEnum.EMPTY]
        ],

        isCellEmpty : function(row, col) {
            return this.board[row][col] == CellEnum.EMPTY;
        },

        isCurrentTurn : function(player) {
            return currentPlayer == player;
        },
        
        getNextEmptyRowInColumn : function(col) {
            var i;
//            console.log("++++");
            for (i = this.size - 1; i >= 0; i--) {
                
                if (this.isCellEmpty(i, col)) {
                    console.log("next empty row is: " + i);
                    return i;
                } else {
//                    console.log("thihis row is NOT valid" + i);
                }
                
            }
//            console.log("++++");
            
            return -1;
        },
        
        lastMoveRow : -1,
        
        tryPlayMove : function(player, toRow, toCol) {
            
            if (player == CellEnum.PLAYER_ONE || player == CellEnum.PLAYER_TWO) {
                if (this.isBoardActive()) {
                    var nextEmptyRow = this.getNextEmptyRowInColumn(toCol);
                    if (nextEmptyRow >= 0) {
                        this.board[nextEmptyRow][toCol] = player;
                        this.lastMoveRow = nextEmptyRow;
                        console.log("***player = " + player);
                        console.log("played move on [row][col]=[" + nextEmptyRow + "][" + toCol + "]");
                        return true;
                    } else {
                        console.log("column is full");
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
            
            console.log("could not play move");
            return false;
        },

        getRowWinner : function(row) {
            var i, winner;
            
            for (i = 0; i <= this.size - 4; i++) {
                if (this.board[row][i] == this.board[row][i+1]
                    && this.board[row][i] == this.board[row][i+2]
                    && this.board[row][i] == this.board[row][i+3])
                {
                    winner = this.board[row][i];
                    if (winner != CellEnum.EMPTY) {
                        return winner;
                    }
                }
            }
            
            return CellEnum.EMPTY;
        },

        getColWinner : function(col) {
            var i, winner, k=0;
            
            for (i = 0; i <= this.size - 4; i++) {
                k++;
                if (this.board[i][col] == this.board[i+1][col]
                    && this.board[i][col] == this.board[i+2][col]
                    && this.board[i][col] == this.board[i+3][col])
                {
                    winner = this.board[i][col];
                    if (winner != CellEnum.EMPTY) {
                        return winner;
                    }
                }
            }
            
            return CellEnum.EMPTY;
        },

        getDiagWinner : function() {
            var i, j, winner;
            for (i = 0; i <= this.size - 4; i++) { // [/] diagonals
                for (j = 0; j <= this.size - 4; j++) {
                    if (this.board[i][j] == this.board[i+1][j+1] &&
                        this.board[i][j] == this.board[i+2][j+2] &&
                        this.board[i][j] == this.board[i+3][j+3])
                    {
                        winner = this.board[i][j];
                        if (winner != CellEnum.EMPTY) {
                            return winner;
                        }
                    }
                }
            }
            
            for (i = 0; i <= this.size - 4; i++) {// [\] diagonals
                for (j = this.size - 1; j >= this.size - 4; j--) {
                    if (this.board[i][j] == this.board[i+1][j-1] &&
                        this.board[i][j] == this.board[i+2][j-2] &&
                        this.board[i][j] == this.board[i+3][j-3])
                    {
                        winner = this.board[i][j];
                        if (winner != CellEnum.EMPTY) {
                            return winner;
                        }
                    }
                }
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

    return c4;
}