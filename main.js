
//gameBoard MODULE
const gameBoard = (()=> {

const container = document.querySelector('#container');
const boxes = Array.from(document.querySelectorAll('.box'));
let boardItems = ['', '', '', '', '', '', '', '', '']; 
let result;

const render = () => {
    boardItems.map((mark, spot) => {
        boxes[spot].textContent = boardItems[spot];  // modified spot in the DOM from array (array->DOM not DOM->array)
    })
};

const winCondition = () =>{
    const combinations = [  //3 in row, diagonal, column
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8],
        [2, 4, 6],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
    ];

    combinations.map((set)=>{
        if (boardItems[set[0]] && boardItems[set[0]]===boardItems[set[1]] && boardItems[set[0]] ===boardItems[set[2]]) { // null===null returns true so, if all values come out to be null it would return true, so to avoid that case boardItems[set[0]] && is added to the front to evaluate any null value to false beforehand
            result = 'strikethrough'
        }
    })
    return result || (boardItems.includes('') ? null : 'tie'); 
}


return {
    container, boxes, boardItems, render, winCondition, 
};
})();

//player FACTORY

const player = (name, mark) => {
    const moves = (gameBoard, box) => {
    const idx = gameBoard.boxes.indexOf(box);
    if (gameBoard.boardItems[idx]===''){
        return idx;
    }
    return null;
    };

    return { name, mark, moves };

}


//displayController/game MODULE 

const game = (() => {
    
    const player1 = document.querySelector('.player1');
    const player2 = document.querySelector('.player2');
    const startbtn = document.querySelector('.start');
    const restartbtn = document.querySelector('.restart');
    let p = document.querySelector('.game-result');
    let firstPlayer;
    let secondPlayer;
    let currentPlayer;

    startbtn.addEventListener('click', (e) => {
      startGame();
    })

    restartbtn.addEventListener('click', (e)=> {
      location.reload();
    })

    const startGame = () => {
            firstPlayer = player(player1.value, 'x');
            secondPlayer = player(player2.value, 'o');
            currentPlayer= firstPlayer;
            play();
    }

    const changePlayer = () => {
        currentPlayer = currentPlayer === firstPlayer ? secondPlayer : firstPlayer;
    }

    const play = () => {
        p.textContent=`Who plays now-> ${currentPlayer.name}`;
        gameBoard.container.addEventListener('click', (e) =>{
        const spot= currentPlayer.moves(gameBoard, e.target);
        if (spot !== null){
            gameBoard.boardItems[spot]=currentPlayer.mark; // modified spot in the array
            console.log(gameBoard.boardItems);
            gameBoard.render();
            let status = gameBoard.winCondition();
            if (status===null){
                changePlayer();
                p.textContent=`Who plays now-> ${currentPlayer.name}`;
            }
            else if (status==='tie'){
                p.textContent="tie";
            }
            else {
                p.textContent=`${currentPlayer.name} wins`;
            }
        }
        
    });
    }
  
    
    return { startGame };

})();

game.startGame();





