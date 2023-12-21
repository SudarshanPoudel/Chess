let boardContainer = document.querySelector('#board')
let turn = 'W'

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
//     ['', '', '', '', '', '', '', ''],
//     ['', 'BR', '', '', '', 'WR', '', ''],
//     ['', '', '', '', '', '', '', ''],
//     ['', '', '', '', '', 'WR', '', ''],
//     ['', '', '', '', '', '', '', ''],
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
            if(board[i][j] === '.'){
                box.innerHTML = `<div class = "dot"></div>`
            }
            else if(board[i][j][0] == '*'){
                box.innerHTML = `<img class = "piece" src = "Pieces/${board[i][j].replace('*', "")}.png"><div class = "dot"></div>`
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
function boxClicked(i, j){
    cleanDots();
    displayBoard()
    if(board[i][j][0] === turn){
        displayPossibleMoves(i, j, board[i][j]);
    }
}


function displayPossibleMoves(row, col, pieceNotation){
    let possibleSpots = calculatePossibleMoves(row, col, pieceNotation)[0];
    let possibleCaptureSpots = calculatePossibleMoves(row, col, pieceNotation)[1];
    possibleSpots.forEach(e =>{
        if(JSON.stringify(possibleCaptureSpots).includes(JSON.stringify(e))){
            board[e[0]][e[1]] = '*' +  board[e[0]][e[1]]
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
    if(pieceNotation[1] === 'R'){
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


    possibleMoves.forEach(e => {
        if(board[e[0]][e[1]] != ''){
            possibleCaptures.push(e);
        }
    })
    return [possibleMoves, possibleCaptures];
}


function displyCaptureAble(i, j){

}


function cleanDots(){
    for(let i = 0; i < 8; i++){
        for(let j = 0; j < 8; j++){
            if(board[i][j] === '.') board[i][j] = ''
            else if(board[i][j][0] === '*') board[i][j] = board[i][j].replace('*', '')
        }
    }
}