const squares = document.querySelectorAll('.column');

const gameboard = (() => {
    let array = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    const viewArray = array;

    let check = (x, y, symbol) => array[x][y] = symbol;

    return {viewArray, check};
})();

const player = (name, symbol) => {
    let moves = 0;

    return {
        name,
        symbol,
        moves
    };
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

const person1 = player('Jeff', 'X');
const person2 = player('Mark', '0');

const game = (() => {
    const players = [person1, person2];
    let steps = 0;
    
    const nextTurn = () => steps++ % 2;

    const playerMark = () => {
        const player = players[nextTurn()];
        player.moves++;
        return player.symbol;
    };
    
    const isAlreadyMarked = (square) => square.innerHTML ? true : false;

    const checkWinner = () => {
        const array = gameboard.viewArray;

        for (let n = 0; n <= 2; n++) {
            if (array[n][0] === 'X' && array[n][1] === 'X' && array[n][2] === 'X' || 
                array[n][0] === '0' && array[n][1] === '0' && array[n][2] === '0' || 
                array[0][n] === 'X' && array[1][n] === 'X' && array[2][n] === 'X' ||
                array[0][n] === '0' && array[1][n] === '0' && array[2][n] === '0' ||
                array[0][0] === '0' && array[1][1] === '0' && array[2][2] === '0' ||
                array[0][0] === 'X' && array[1][1] === 'X' && array[2][2] === 'X' ||
                array[0][2] === 'X' && array[1][1] === 'X' && array[2][0] === 'X' ||
                array[0][2] === '0' && array[1][1] === '0' && array[2][0] === '0') {
                return true;
                };
        }
        return false;
    };

    return {isAlreadyMarked, playerMark, checkWinner};
})();


const beginGame = (() => {
    squares.forEach(square => {
        square.addEventListener('click', () => {
            const id = square.id.split(" ");

            if (!game.isAlreadyMarked(square)) {
                gameboard.check(id[0], id[1], game.playerMark());
                renderTable();
            };
            console.log(game.checkWinner());
    });
});
})();
