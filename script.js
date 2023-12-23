let boardContainer = document.querySelector('#board')
let turn = 'W'
let whitePieces = ['WK', 'WQ', 'WB', 'WN', 'WR', 'WP']
let blackPieces = ['BK', 'BQ', 'BB', 'BN', 'BR', 'BP']
let isGameOver = false;
//Board Array 
let board = [
    ['BR', 'BN', 'BB', 'BQ', 'BK', 'BB', 'BN', 'BR'],
    ['BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP'],
    ['WR', 'WN', 'WB', 'WQ', 'WK', 'WB', 'WN', 'WR']
]

// let board = [
//     ['BK', 'BR', '', '', '', '', 'WQ', ''],
//     ['', '', '', '', '', '', '', ''],
//     ['', '', '', '', '', '', '', ''],
//     ['', 'BP', '', '', '', '', '', ''],
//     ['', '', '', 'WQ', '', '', '', ''],
//     ['', '', '', '', '', '', '', ''],
//     ['', '', '', '', '', '', '', ''],
//     ['', '', '', '', '', '', '', ''],
// ]



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
    if(!isGameOver){
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
}

function movePiece(startingCord, finalCord, isToJustCheck = false){
    board[finalCord[0]][finalCord[1]] = board[startingCord[0]][startingCord[1]]
    board[startingCord[0]][startingCord[1]] = ''
    pawnpromotion();
    if(!isToJustCheck){
        console.log(startingCord, finalCord)

        //Check for Game Over
        if(board[finalCord[0]][finalCord[1]].includes('WK')){
            alert("black Wins")
            isGameOver = true
        } else if(board[finalCord[0]][finalCord[1]].includes('BK')){
            alert("white Wins")
            isGameOver = true
        }
        displayBoard();
        cleanDots();
        changeTurn();
    }
}

// Funcion That displayes possible moves when clicked
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

//Function to calculate possible moves for specific piece at specific position
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
            if (e[0] < 0 || e[0] > 7 || e[1] < 0 || e[1] > 7 || board[e[0]][e[1]][0] == pieceNotation[0]) {
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
    possibleMoves.forEach(e =>{
        if(board[e[0]][e[1]] != ''){
            possibleCaptures.push(e);
        }
    })


    return [possibleMoves, possibleCaptures];
}

function possibleMove(pieceNotation, currentPosition, possibleNextPositions){
    this.pieceName = pieceNotation;
    this.position = currentPosition;
    this.nextMoves = possibleNextPositions;
}

function calculateAllPossibleMoves(type){
    let allPossibleMoves = [];
    let nextMoves;
    for(let i = 0; i < 8; i++){
        for(let j = 0; j < 8; j++){
            e = board[i][j];
            if(type === 'W' && whitePieces.includes(e)){
                nextMoves = calculatePossibleMoves(i, j, e)[0]
                if(nextMoves.length > 0)
                allPossibleMoves.push(new possibleMove(e, [i, j],nextMoves))
            }
            if(type === 'B' && blackPieces.includes(e)){
                nextMoves = calculatePossibleMoves(i, j, e)[0]
                if(nextMoves.length > 0)
                allPossibleMoves.push(new possibleMove(e, [i, j], nextMoves))
            }
        }
    }
    return allPossibleMoves;

}

function changeTurn(){
    if(turn === 'W'){
        turn = 'B'
        setTimeout(() => {
            computerMove()

        }, 100);
    } 
    else turn = 'W'
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


function pawnpromotion(){
    for(let i = 0; i < 8; i++){
        if(board[0][i] === 'WP') board[0][i] = 'WQ'
        if(board[7][i] === 'BP') board[0][i] = 'BQ'
    }
}