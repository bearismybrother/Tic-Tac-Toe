const cells=document.querySelectorAll('td')

const GameBoard = function(){
    const rows=3;
    const column=3;
    const board=[];

    function resetBoard(){
    for (let x=0; x<column; x++){
        board[x] = []
        for (let y=0; y<rows; y++){
            board[x][y] = 0;
        }
    }
    }

    resetBoard();

    //set up dynamic functionability
    cells.forEach((cell)=>cell.addEventListener("mouseover", (event) => {
        cell.classList.add('hovered')
    }));

    cells.forEach((cell)=>cell.addEventListener("mouseout", (event) => {
        cell.classList.remove('hovered')
    }));

    function pickCell(playerNum, x, y){
        document.querySelector('.cell-' + x + '-' +y).textContent = (playerNum==1)? 'X' : 'O';
        board[x][y] = playerNum; 
    }

    return {board, pickCell, resetBoard}
}();

function checkIfGameOver(board){
//vertical win
        for (x=0; x<board.length; x++){
            if (board[x][0] == board[x][1] && board[x][1] == board[x][2] && board[x][0] !=0)
            {
                return true; 
            }
        }
        //horizontal win
        for (y=0; y<board[0].length; y++){
            if (board[0][y] == board[1][y] && board[1][y] == board[2][y] && board[0][y] != 0)
            {
                return true; 
            }
        }

        //diagonal win
        if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != 0) {
            return true; 
        } else if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != 0) {
            return true; 
        }
        else 
            return false; 
}

function makeUnclickable (target) {
    target.style.pointerEvents = "none";
}

//logic and turn based
function startGame(gameBoard){
    let playerTurn = 1; 
    let tieCounter = 0; 
    gameBoard.resetBoard();

    cells.forEach((cell)=>cell.addEventListener("click",(e)=>{
        makeUnclickable(e.target)
        const coordinates = (e.target.className); //extract x and y from here and pass in 

        XYcoordinates= coordinates.split('-');
        let x = parseInt(XYcoordinates[1]);
        let y = parseInt(XYcoordinates[2]);
        gameBoard.pickCell(playerTurn , x, y);

        //end turn check here

        if (checkIfGameOver(gameBoard.board)){
            gameOver(playerTurn);
        }
        playerTurn = (playerTurn === 1) ? 2 : 1;

        //check when all cells are filled and no winner = tie
        if (++tieCounter==9)
        {
            gameOver("tied");
        }
    }))
}

const playBtn = document.querySelector(".playBtn");
playBtn.addEventListener('click',()=>{
    startGame(GameBoard);
    removeMenuInterface();
})

function removeMenuInterface(){
    document.querySelector(".menuInterface").remove();
}

const board = document.querySelector(".container");
function gameOver(winner){
    let text ='';
    if (winner === "tied")
    {
        text = "It's a tied";
    }
    else 
    {
        text = "Player " + winner + " wins!!!";
    }
    makeUnclickable(board);
    const endScreen = document.createElement('div')
    endScreen.classList.add("endScreenOverlap");
    endScreen.textContent = text;


    const retryBtn = document.createElement('button');
    retryBtn.textContent = "retry";
    retryBtn.addEventListener('click',()=>{
        startGame(gameBoard);
    })
    endScreen.appendChild(retryBtn)



    document.body.appendChild(endScreen)
}

