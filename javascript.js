const squares = document.querySelectorAll('.column');
const person1 = document.querySelector('#person1');
const person2 = document.querySelector('#person2');
const button = document.querySelector('#start-button')

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

const player = (name, symbol) => {
    let moves = 0;
    let score = 0;
    
    return {
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

    const persons = [person1, person2];

    const showGameWindow = () => {
        window.style.visibility = 'visible';
        entryWindow.remove();
    };

    const getInputValue = () => {
         game.players[0] = player(playerNick1.value, 'X');
         game.players[1] = player(playerNick2.value, '0');
         console.log(playerNick1.value)
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
    return {renderTable, setNicknames, showGameWindow, getInputValue};
})();

// const player1 = player('Jeff', 'X');
// const player2 = player('Mark', '0');

const game = (() => {
    let player1;
    let player2;

    const players = [player1, player2];
    let roundIsOver = false;
    let steps = 0;
    
    const nextTurn = () => steps++ % 2;
    
    // const createPlayers = (name1, name2) => {
    //     players[0] = player(name1, 'X');
    //     players[1] = player(name2, '0');
    // }

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
            if (array[n][0] === 'X' && array[n][1] === 'X' && array[n][2] === 'X' || 
            array[0][n] === 'X' && array[1][n] === 'X' && array[2][n] === 'X' || 
            array[0][0] === 'X' && array[1][1] === 'X' && array[2][2] === 'X' ||
            array[0][2] === 'X' && array[1][1] === 'X' && array[2][0] === 'X') {
                return 'X';
            };
            if (array[n][0] === '0' && array[n][1] === '0' && array[n][2] === '0' ||
            array[0][n] === '0' && array[1][n] === '0' && array[2][n] === '0' ||
            array[0][0] === '0' && array[1][1] === '0' && array[2][2] === '0' ||
            array[0][2] === '0' && array[1][1] === '0' && array[2][0] === '0') {
                return '0';
            };
        };
        if (players[0].moves + players[1].moves === 9) return 'tie';

        return false;
    };
    
    const checkWinner = () => {
        if (checkCondition() === 'X' || '0' && !roundIsOver) {
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
            
        return {checkWinner, mark, restart, players};
    })();
            
    const beginGame = () => {
        DOM.showGameWindow();
        DOM.setNicknames();
        squares.forEach(square => {
            square.addEventListener('click', () => {
                game.mark(square);
                DOM.renderTable();
                game.checkWinner();
        });
    });
};

button.addEventListener('click', () => beginGame());    
    
    