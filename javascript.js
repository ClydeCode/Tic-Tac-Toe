const squares = document.querySelectorAll('.column');
const person1 = document.querySelector('#player1');
const person2 = document.querySelector('#player2');

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
    const persons = [person1, person2];
    
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
    return {renderTable, setNicknames};
})();

const player1 = player('Jeff', 'X');
const player2 = player('Mark', '0');

const game = (() => {
    const players = [player1, player2];
    let roundIsOver = false;
    let steps = 0;
    
    const nextTurn = () => steps++ % 2;
    
    const playerMark = () => {
        const player = players[nextTurn()];
        player.moves++;
        return player.symbol;
    };
    
    const isAlreadyMarked = (item) => item.innerHTML ? true : false;
    
    const mark = (item) => {
        const id = item.id.split(' ');
        if (!isAlreadyMarked(item) && !roundIsOver) gameboard.check(id[0], id[1], playerMark());
        DOM.renderTable();
    };
    
    const checkWin = () => {
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
        return false;
    };
    
    const checkWinner = () => {
        if (checkWin() && !roundIsOver) {
            players.forEach(player => {
                if (player.symbol === checkWin()) { 
                    player.score++;
                    roundIsOver = true;
                    return console.log(`${player.name} won!`);
                };
            });
        }};
        
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
        DOM.setNicknames();
        squares.forEach(square => {
            square.addEventListener('click', () => {
                game.mark(square);
                game.checkWinner();
        });
    });
};

beginGame();
    
    
    