const gameboard = (() => {
    let array = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    const viewArray = array;

    let check = (x, y, symbol) => array[x][y] = symbol;

    return {check, viewArray};
})();

const renderTable = () => {
    console.log(gameboard.viewArray);
};

renderTable();