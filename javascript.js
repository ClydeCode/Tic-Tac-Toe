const squares = document.querySelectorAll('.column');

const gameboard = (() => {
    let array = [
        ['X', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    const viewArray = array;

    let check = (x, y, symbol) => array[x][y] = symbol;

    return {check, viewArray};
})();

const renderTable = () => {
    let count = 0;
    gameboard.viewArray.forEach(item => {
        if (item) {
            for (let n = 0; n <= 2; n++) {
                squares.item(count).innerHTML = item[n];
                count++;
            };
        };
    });
};

