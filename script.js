window.addEventListener('DOMContentLoaded',()=>{

    const boxs = Array.from(document.querySelectorAll('.box'));
    const playerDisplay = document.querySelector('.display-player');
    const reset = document.getElementById('reset');
    const announcer = document.querySelector('.announcer');
    const audio = new Audio('win.mp3')

    let board = ['','','','','','','','',''];
    let currentPlayer = 'X';
    let isgameOver = true;

    const playerX_won = 'PLAYERX_WON';
    const playerO_won = 'PLAYERO_WON';
    const tie = "TIE";

    const win = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    const handleResult = ()=>{
        let roundWon = false;
        for(let i = 0; i <= 7; i++){
            const winCondition = win[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];

            if(a == '' || b == '' || c == ''){
                continue;
            }
            if(a == b && b == c){
                audio.currentTime = 0;
                audio.play();
                roundWon = true;
                break;
            }
        }

        if(roundWon){
            annouce(currentPlayer === 'X' ? playerX_won : playerO_won);
            isgameOver = false
            return;
        }

        if(!board.includes('')){
            annouce(tie);
        }
    }

    const isvalidAction = (box) => {
        if(box.innerHTML === 'X' || box.innerHTML === 'O'){
            return false;
        }
        return true;
    }

    const resetBoard = ()=>{
        board = ['','','','','','','','',''];
        isgameOver = true;
        announcer.classList.add('hide');
        
        if(currentPlayer === 'O'){
            changePlayer();
        }

        boxs.forEach(box => {
            box.innerHTML = '';
            box.classList.remove('playerX');
            box.classList.remove('playerO');
            
        })

        document.getElementById('gif').style.width = `0vh`;
        document.getElementById('gif').style.height = `0vh`;
        audio.pause();
    }

    const annouce = (type)=>{
        switch (type) {
            case playerO_won:
                announcer.innerHTML = `Player <span class='playerO'>O</span> Won`;
                document.getElementById('gif').style.width = `10vh`;
                document.getElementById('gif').style.height = `10vh`;
                break;
                
            case playerX_won:
                announcer.innerHTML = `Player <span class='playerX'>X</span> Won`;
                document.getElementById('gif').style.width = `10vh`;
                document.getElementById('gif').style.height = `10vh`;
                break;    

            case tie:
                announcer.innerHTML = `Tie`
                break;
        }
        announcer.classList.remove('hide');
    }

    const changePlayer = ()=>{
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerHTML = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);

    }

    const updateBoard = (index)=>{
        board[index] = currentPlayer;
    }

    boxs.forEach((box, index)=>{
        box.addEventListener('click', ()=> {
            if(isvalidAction(box) && isgameOver){
                box.innerHTML = currentPlayer;
                box.classList.add(`player${currentPlayer}`);
                updateBoard(index);
                handleResult();
                changePlayer();
            }
        })
    })

    reset.addEventListener('click', resetBoard);
})