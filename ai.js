function computerMove(){
    let bestValue = Infinity;
    let bestMove;
    let allMovesPiece = calculateAllPossibleMoves('B')
    for(i = 0; i < allMovesPiece.length; i++){
        let pieceToMove = allMovesPiece[i];
        let allNextmoves = pieceToMove.nextMoves;
        for(let j = 0; j < allNextmoves.length; j++){
            const tempBoard = JSON.stringify(board)
            movePiece(pieceToMove.position,allNextmoves[j], true)
            let value = minimax(board, 0, true);  //callls Minimax function for score of that move
            board = JSON.parse(tempBoard)


            if(value < bestValue){
                bestValue = value;
                bestMove = {piece : pieceToMove, nextpos : allNextmoves[j]}  //Save current move as best move if new score is less than prev.
            }
            
        }
        
    }
    movePiece(bestMove.piece.position , bestMove.nextpos)
}

let n = 0;
function minimax(board, depth, isMaximizing){
    if(depth > 2){
        return evaluatePosition();
    }
    

    if(isMaximizing){
        let bestValue = -Infinity;
        let allMovesPiece = calculateAllPossibleMoves('W')
        for(i = 0; i < allMovesPiece.length; i++){
            let pieceToMove = allMovesPiece[i];
            let allNextmoves = pieceToMove.nextMoves;
            for(let j = 0; j < allNextmoves.length; j++){
                const tempBoard = JSON.stringify(board)
                movePiece(pieceToMove.position,allNextmoves[j], true)
                let value = minimax(board, depth+1, false);  //callls Minimax function for score of that move
                board = JSON.parse(tempBoard)


                if(value > bestValue){
                    bestValue = value;
                }
                
            }
            
        }
        return bestValue;
    }
    else{

        let bestValue = Infinity;
        let allMovesPiece = calculateAllPossibleMoves('B')
        for(i = 0; i < allMovesPiece.length; i++){
            let pieceToMove = allMovesPiece[i];
            let allNextmoves = pieceToMove.nextMoves;
            for(let j = 0; j < allNextmoves.length; j++){
                let tempBoard = JSON.stringify(board)
                movePiece(pieceToMove.position,allNextmoves[j], true)
                let value = minimax(board, depth+1, true);  //callls Minimax function for score of that move
                board = JSON.parse(tempBoard)


                if(value < bestValue){
                    bestValue = value;
                }
                
            }
            
        }
        return bestValue;
    }
}


// Minimax Function
function minimax2(board, depth, isMaximizing){
    //If Game is over returns same value returned by checkResult function
    if(checkResult(board) != null){
        return checkResult(board);
    }

    //Similar as computerChoice function, Calls this function recursively for each possible moves while changing turns till it returns solid value of result.
    if(isMaximizing){
        let bestValue = -Infinity;
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                if(board[i][j] === ""){
                    board[i][j] = "X"
                    let value = minimax(board, depth + 1, false);
                    board[i][j] = ""
    
                    if(value > bestValue){
                        bestValue = value;
                    }
                }
            }
        }
        return bestValue;
    }
    else{
        let bestValue = Infinity;
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                if(board[i][j] === ""){
                    board[i][j] = "O"
                    let value = minimax(board, depth + 1, true);
                    board[i][j] = ""
    
                    if(value < bestValue){
                        bestValue = value;
                    }
                }
            }
        }
        return bestValue;
    }
}



const pieceValues = {
    'WK' : 1000,
    'WQ' : 9,
    'WB' : 3,
    'WN' : 3,
    'WR' : 5,
    'WP' : 1,
    'BK' : -1000,
    'BQ' : -9,
    'BB' : -3,
    'BN' : -3,
    'BR' : -5,
    'BP' : -1

}
function evaluatePosition(){
    let eval = 0;
    let blackPieces = allPiecesInBoard(board, 'B')
    let whitePieces = allPiecesInBoard(board, 'W')
    blackPieces.forEach(e => {
        eval += pieceValues[e.name]
    });
    whitePieces.forEach(e => {
        eval += pieceValues[e.name]
    });
    return eval;
}