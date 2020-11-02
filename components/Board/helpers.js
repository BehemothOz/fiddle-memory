export const getStatus = (i, board) => {
    // with ramda ->> R.lensPath([i, 'status], board) + R.view
    return board[i].status;
};

/*
    How make this function:
    1. manual nesting (?)
    2. lensing (?)

    Target:
    - change the status of a cell

    Solutions:
    - mutable operation (ex, board[i].status = status) (bad)
    - immutable operation
    -- lensing ex: R.set(R.lensPath(`${i}.status`, status, board))
*/
export const setStatus = (i, status, board) => {
    /*
        with ramda
        1. path = R.lensPath([i, 'status']) - returns a lens whose focus is the specified path.
        2. R.set(path, status, board) - returns the result of "setting" the portion of the given
            data structure focused by the given lens to the given value.
    */

    return board.reduce((acc, item, index) => {
        return i === index ? [...acc, { ...item, status }] : [...acc, item];
    }, []);
};

// return [status * n] or [] | see R.chain()
export const getStatuses = (predicateFn, board) => {
    return board.filter(predicateFn).map(cell => cell.status);
    // name for vae - passedName
};

export const setStatuses = (predicateFn, status, board) => {
    return board.map(cell => (predicateFn(cell) ? { ...cell, status } : cell));
};

export const getSymbols = (predicateFn, board) => {
    return board.filter(predicateFn).map(cell => cell.symbol);
};
