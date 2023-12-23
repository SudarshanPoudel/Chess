let boardContainer = document.querySelector('#board')
let turn = 'B'
let whitePieces = ['WK', 'WQ', 'WB', 'WN', 'WR', 'WP']
let blackPieces = ['BK', 'BQ', 'BB', 'BN', 'BR', 'BP']
//Board Array 
// let board = [
//     ['BR', 'BN', 'BB', 'BQ', 'BK', 'BB', 'BN', 'BR'],
//     ['BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP'],
//     ['', '', '', '', '', '', '', ''],
//     ['', '', '', '', '', '', '', ''],
//     ['', '', '', '', '', '', '', ''],
//     ['', '', '', '', '', '', '', ''],
//     ['WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP'],
//     ['WR', 'WN', 'WB', 'WQ', 'WK', 'WB', 'WN', 'WR']
// ]

let board = [
    ['BK', 'BR', '', '', '', '', 'WQ', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', 'BP', '', '', '', '', '', ''],
    ['', '', '', 'WQ', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
]



// Function to display board
displayBoard()
function displayBoard(){
    boardContainer.innerHTML = ''
    for(let i = 0; i < 8; i++){
        for(let j = 0; j < 8; j++){
            let box = document.createElement('div')
            box.classList = ['box']
            if((i+j)%2 != 0) box.classList.add('dark-box')
            // box.innerHTML = i.toString() + j
            if(board[i][j] === '.'){
                box.innerHTML = `<div class = "dot"></div>`
            }
            else if(board[i][j][2] == '*'){
                box.innerHTML = `<img class = "piece" src = "Pieces/${board[i][j].replace('*', "")}.png"><div class = "circle"></div>`
            }
            else if(board[i][j] != ''){
                box.innerHTML = `<img class = "piece" src = "Pieces/${board[i][j]}.png">`
            }

            box.addEventListener('click', ()=>{
                boxClicked(i, j)
            })
            boardContainer.appendChild(box)
        }
    }
}

//Function to call when box is clicked
let pieceClickedCord = [-1, -1]
function boxClicked(i, j){
    if(board[i][j][0] === turn){
        displayPossibleMoves(i, j, board[i][j]);
        pieceClickedCord = [i, j]
    }
    else if(board[i][j] === '.' || board[i][j][2] === '*'){
        movePiece(pieceClickedCord, [i, j]);
    }

    else{
        cleanDots();
    }
    displayBoard();
}

function movePiece(startingCord, finalCord){
    board[finalCord[0]][finalCord[1]] = board[startingCord[0]][startingCord[1]]
    board[startingCord[0]][startingCord[1]] = ''
    displayBoard();
    cleanDots();
    changeTurn();
}


function displayPossibleMoves(row, col, pieceNotation){
    cleanDots()
    let possibleSpots = calculatePossibleMoves(row, col, pieceNotation)[0];
    let possibleCaptureSpots = calculatePossibleMoves(row, col, pieceNotation)[1];
    possibleSpots.forEach(e =>{
        if(JSON.stringify(possibleCaptureSpots).includes(JSON.stringify(e))){
            board[e[0]][e[1]] = board[e[0]][e[1]] + '*'
        }
        else board[e[0]][e[1]] = '.'
    })
    displayBoard()
}


function calculatePossibleMoves(row, col, pieceNotation){
    let oppositeType = 'W'
    if(pieceNotation[0] === 'W') oppositeType = 'B'
    
    let possibleMoves = [];
    let possibleCaptures = [];
    let i, j;

    // Possible Move for Rooks and Queens
    if(pieceNotation[1] === 'R' || pieceNotation[1] === 'Q'){
        for(i = row+1; i < 8; i++){
            if(board[i][col][0] === oppositeType){
                possibleMoves.push([i, col])
                break;
            }
            else if(board[i][col] != '') break;
            possibleMoves.push([i, col])
        }
        for(i = row-1; i >= 0; i--){
            if(board[i][col][0] === oppositeType){
                possibleMoves.push([i, col])
                break;
            }
            else if(board[i][col] != '') break;
            possibleMoves.push([i, col])
        }
        for(i = col+1; i < 8; i++){
            if(board[row][i][0] === oppositeType){
                possibleMoves.push([row, i])
                break;
            }
            else if(board[row][i] != '') break;
            possibleMoves.push([row, i])
        }
        for(i = col-1; i >= 0; i--){
            if(board[row][i][0] === oppositeType){
                possibleMoves.push([row, i])
                break;
            }
            else if(board[row][i] != '') break;
            possibleMoves.push([row, i])
        }
    }


    //Possible Moves for Bishops and Queen
    if(pieceNotation[1] === 'B' || pieceNotation[1] === 'Q'){
        i = row; j = col;
        while(i > 0 && j > 0){
            i--;j--;
            if(board[i][j][0] === oppositeType){
                possibleMoves.push([i, j])
                break;
            }
            else if(board[i][j] != '') break;
            possibleMoves.push([i, j])
        }

        i = row; j = col;
        while(i < 7 && j < 7){
            i++;j++;
            if(board[i][j][0] === oppositeType){
                possibleMoves.push([i, j])
                break;
            }
            else if(board[i][j] != '') break;
            possibleMoves.push([i, j])
        }

        i = row; j = col;
        while(i < 7 && j > 0){
            i++;j--;
            if(board[i][j][0] === oppositeType){
                possibleMoves.push([i, j])
                break;
            }
            else if(board[i][j] != '') break;
            possibleMoves.push([i, j])
        }
        
        i = row; j = col;
        while(i > 0 && j < 7){
            i--;j++;
            if(board[i][j][0] === oppositeType){
                possibleMoves.push([i, j])
                break;
            }
            else if(board[i][j] != '') break;
            possibleMoves.push([i, j])
        }
        
    }


    //Possible Moves for King
    if(pieceNotation[1] === 'K'){
        possibleMoves.push([row+1, col+1])
        possibleMoves.push([row+1, col])
        possibleMoves.push([row+1, col-1])
        possibleMoves.push([row, col+1])
        possibleMoves.push([row, col-1])
        possibleMoves.push([row-1, col])
        possibleMoves.push([row-1, col+1])
        possibleMoves.push([row-1, col-1])

        for (let i = possibleMoves.length - 1; i >= 0; i--) {
            const e = possibleMoves[i];
            if (e[0] < 0 || e[0] > 7 || e[1] < 0 || e[1] > 7 || board[e[0]][e[1]][0] == pieceNotation[0] || isPieceCaptureAble(pieceNotation, e)) {
                possibleMoves.splice(i, 1);
            }
        }

    }

    //Possible moves for Pawns
    if(pieceNotation[1] === 'P'){
        if(pieceNotation[0] === 'W'){
            if(board[row-1][col] === '') possibleMoves.push([row - 1, col]);
            if(row == 6 && board[row-1][col] === '' && board[row-2][col] === '') possibleMoves.push([row - 2, col]);
            if(col > 0 && board[row-1][col-1][0] === oppositeType) possibleMoves.push([row - 1, col-1]);
            if(col < 7 && board[row-1][col+1][0] === oppositeType) possibleMoves.push([row - 1, col+1]);
        }
        else{
            if(board[row+1][col] === '') possibleMoves.push([row + 1, col]);
            if(row == 1 && board[row+1][col] === '' && board[row+2][col] === '') possibleMoves.push([row + 2, col]);
            if(col > 0 && board[row+1][col-1][0] === oppositeType) possibleMoves.push([row + 1, col-1]);
            if(col < 7 && board[row+1][col+1][0] === oppositeType) possibleMoves.push([row + 1, col+1]);
        }

    }

    //Possible Moves of Knights
    if(pieceNotation[1] === 'N'){
        possibleMoves.push([row+2, col+1])
        possibleMoves.push([row+2, col-1])
        possibleMoves.push([row-2, col+1])
        possibleMoves.push([row-2, col-1])
        possibleMoves.push([row+1, col+2])
        possibleMoves.push([row+1, col-2])
        possibleMoves.push([row-1, col+2])
        possibleMoves.push([row-1, col-2])

        for (let i = possibleMoves.length - 1; i >= 0; i--) {
            const e = possibleMoves[i];
            if (e[0] < 0 || e[0] > 7 || e[1] < 0 || e[1] > 7 || board[e[0]][e[1]][0] == pieceNotation[0]) {
                possibleMoves.splice(i, 1);
            }
        }

    }
    for (let i = possibleMoves.length - 1; i >= 0; i--) {
        const e = possibleMoves[i];
        if (willKingbeAtCheck(pieceNotation, [row, col], e)) {
            possibleMoves.splice(i, 1);
        }
        if(board[e[0]][e[1]] != ''){
            possibleCaptures.push(e);
        }
    }


    return [possibleMoves, possibleCaptures];
}

function possibleMove(pieceNotation, currentPosition, possibleNextPositions){
    this.pieceName = pieceNotation;
    this.position = currentPosition;
    this.nextMoves = possibleNextPositions;
}

function calculateAllPossibleMoves(){
    let allPossibleMoves = [];
    let nextMoves;
    for(let i = 0; i < 8; i++){
        for(let j = 0; j < 8; j++){
            e = board[i][j];
            if(turn === 'W' && whitePieces.includes(e)){
                nextMoves = calculatePossibleMoves(i, j, e)[0]
                if(nextMoves.length > 0)
                allPossibleMoves.push(new possibleMove(e, [i, j],nextMoves))
            }
            if(turn === 'B' && blackPieces.includes(e)){
                nextMoves = calculatePossibleMoves(i, j, e)[0]
                if(nextMoves.length > 0)
                allPossibleMoves.push(new possibleMove(e, [i, j], nextMoves))
            }
        }
    }
    return allPossibleMoves;

}

function changeTurn(){
    if(turn === 'W') turn = 'B'
    else turn = 'W'
}

function isPieceCaptureAble(pieceNotation, checkPosition){
    let iscapturable = false;
    let tempBoard = board;
    let opponentType = pieceNotation[0] === 'W' ? 'B' : 'W'
    let opponentPieces = allPiecesInBoard(board, opponentType)
    for(let i = 0; i < opponentPieces.length; i++){
        let e = opponentPieces[i]
        pieceMoves = calculatePossibleMoves(e.position[0], e.position[1], e.name)[0];
        if(JSON.stringify(pieceMoves).includes(JSON.stringify(checkPosition))){
            iscapturable = true;
            board = tempBoard
            break
        }
    }
    return iscapturable
}

function willKingbeAtCheck(pieceNotation, currentPos, nextPos){
    let willKing = false
    let king = pieceNotation[0] === 'W' ? 'WK' : 'BK'
    let kingPos = [-1, -1]
    for(let i = 0; i < 8; i++){
        for(let j = 0; j < 8; j++){
            if(board[i][j] === king){
                kingPos = [i, j];
                break;
            }
        }
    }
    let tempBoard = board;
    board[nextPos[0]][nextPos[1]] = board[currentPos[0]][currentPos[1]]
    board[currentPos[0]][currentPos[1]] = ''
    willKing = isPieceCaptureAble(king, kingPos);
    board = tempBoard
    return willKing
}

function piece(pieceName, position){
    this.name = pieceName;
    this.type = pieceName[0];
    this.position = position;
}

function allPiecesInBoard(board, type){
    let pieces = []
    for(let i = 0; i < 8; i++){
        for(let j = 0; j < 8; j++){
            e = board[i][j]
            if(e[0] === type && (whitePieces.includes(e) || blackPieces.includes(e))){
                pieces.push(new piece(e, [i, j]))
            }
        }
    }

    return pieces;
}


function cleanDots(){
    for(let i = 0; i < 8; i++){
        for(let j = 0; j < 8; j++){
            if(board[i][j] === '.') board[i][j] = ''
            else if(board[i][j][2] === '*') board[i][j] = board[i][j].replace('*', '')
        }
    }
}