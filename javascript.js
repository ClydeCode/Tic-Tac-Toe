const squares = document.querySelectorAll('.column');
const person1 = document.querySelector('#person1');
const person2 = document.querySelector('#person2');
const button = document.querySelector('#start-button')
const restartButon = document.querySelector('#restart-button')

const gameboard = (() => {
    let array = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    
    const viewArray = array;
    
    const check = (x, y, symbol) => array[x][y] = symbol;
    
    return {viewArray, check};

})();

const player = (id, name, symbol) => {
    let moves = 0;
    let score = 0;
    
    return {
        id,
        name,
        symbol,
        moves,
        score
    };
};

const DOM = (() => {
    const entryWindow = document.querySelector('.first-wrapper');
    const window = document.querySelector('.second-wrapper');
    const playerNick1 = document.getElementById('player1');
    const playerNick2 = document.getElementById('player2');
    const playerScore1 = document.getElementById('person1-score');
    const playerScore2 = document.getElementById('person2-score');
    const winnerIcon = document.querySelector('.winner-icon');

    let playerNickname1, playerNickname2;
    const nicknames = [playerNickname1, playerNickname2];

    const persons = [person1, person2];

    const showWinnerIcon = (id) => {
        winnerIcon.forEach(icon => {
            if (id === icon.id) icon.style.visibility = 'visible';
        });
    };

    const updatePlayerScore = () => {
        playerScore1.innerHTML = `Score: ${game.players[0].score}`;
        playerScore2.innerHTML = `Score: ${game.players[1].score}`;
    };

    const showGameWindow = () => {
        window.style.visibility = 'visible';
        entryWindow.remove();
    };

    const passInputValue = () => {
        nicknames[0] = playerNick1.value;
        nicknames[1] = playerNick2.value;
    };
    
    const setNicknames = () => {
        index = 0;
        persons.forEach(person => person.innerHTML = game.players[index++].name);
    };
    
    const renderTable = () => {
        let count = 0;
        gameboard.viewArray.forEach(item => {
            for (let n = 0; n <= 2; n++) {
                squares.item(count).innerHTML = item[n];
                count++;
            };
        });
    };
    return {renderTable, setNicknames, showGameWindow, passInputValue, updatePlayerScore, showWinnerIcon, nicknames};
})();

const game = (() => {
    const players = [player1, player2];

    let roundIsOver = false;
    let steps = 0;
    
    const nextTurn = () => steps++ % 2;
    
    const createPlayers = () => {
       players[0] = player(1, DOM.nicknames[0], 'X');
       players[1] = player(2, DOM.nicknames[1], '0');
    }

    const playerMark = () => {
        const player = players[nextTurn()];
        player.moves++;
        return player.symbol;
    };
    
    const isAlreadyMarked = (item) => item.innerHTML ? true : false;
    
    const mark = (item) => {
        const id = item.id.split(' ');
        if (!isAlreadyMarked(item) && !roundIsOver) gameboard.check(id[0], id[1], playerMark());
    };
    
    const checkCondition = () => {
        const array = gameboard.viewArray;

        for (let n = 0; n <= 2; n++) {
            if (array[n][0] === 'X' && array[n][1] === 'X' && array[n][2] === 'X');
        };
        
        for (let n = 0; n <= 2; n++) {
            if (array[n][0] === 'X' && array[n][1] === 'X' && array[n][2] === 'X' || 
                array[0][n] === 'X' && array[1][n] === 'X' && array[2][n] === 'X' || 
                array[0][0] === 'X' && array[1][1] === 'X' && array[2][2] === 'X' ||
                array[0][2] === 'X' && array[1][1] === 'X' && array[2][0] === 'X') {
                    return 'X';
            };
            if (array[n][0] === 'O' && array[n][1] === 'O' && array[n][2] === 'O' ||
                array[0][n] === 'O' && array[1][n] === 'O' && array[2][n] === 'O' ||
                array[0][0] === 'O' && array[1][1] === 'O' && array[2][2] === 'O' ||
                array[0][2] === 'O' && array[1][1] === 'O' && array[2][0] === 'O') {
                    return 'O';
            };
        };
        if (players[0].moves + players[1].moves === 9) return 'tie';

        return false;
    };
    
    const checkWinner = () => {
        if ((checkCondition() === 'X' || 'O' ) && !roundIsOver) {
            players.forEach(player => {
                if (player.symbol === checkCondition()) { 
                    player.score++;
                    roundIsOver = true;
                    return console.log(`${player.name} won!`);
                };
            });
        }
        if (checkCondition() === 'tie' && !roundIsOver) {
            roundIsOver = true;
            return console.log('tie');
        }
    };
        
    const restart = () => {
        for (let row = 0; row <= 2; row++) 
            for (let column = 0; column <= 2; column++) 
            gameboard.check(row, column, '');
                
            players.forEach(player => player.moves = 0);
                
            steps = 0;
            roundIsOver = false;
            DOM.renderTable();
        };
            
        return {checkWinner, mark, restart, players, createPlayers};
    })();
            
    const beginGame = () => {
        DOM.showGameWindow();
        game.createPlayers();
        DOM.setNicknames();
        DOM.updatePlayerScore();
        squares.forEach(square => {
            square.addEventListener('click', () => {
                game.mark(square);
                DOM.renderTable();
                game.checkWinner();
                DOM.updatePlayerScore();
        });
    });
};

button.addEventListener('click', () => beginGame());    
    
restartButon.addEventListener('click', () => game.restart());
