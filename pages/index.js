import { useEffect, useState } from 'react';
import * as Board from '../components/Board';

/*
    TODO
    * 1. logic without Ramda
    * 2. logic with Ramda
*/

// one-dimensional - array
// two-dimensional - matrix

// TODO: statues - this is constants from Cell file
const initBoard = [
    { symbol: 'A', status: 'closed' },
    { symbol: 'A', status: 'closed' },
    { symbol: 'B', status: 'closed' },
    { symbol: 'B', status: 'closed' },
];

// helpers for statues cell
const isOpen = cell => cell.status === 'open';
const isFailed = cell => cell.status === 'failed';
const isClosed = cell => cell.status === 'closed';

let statuses = {
    Stopped: 'Stopped',
    Running: 'Running',
    Won: 'Won',
    Lost: 'Lost',
};

const getStatusAt = (i, board) => {
    /*
        with ramda
        R.lensPath([i, 'status], board) + R.view
    */

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
const setStatusAt = (i, status, board) => {
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
const getStatuses = (predicateFn, board) => {
    return board.filter(predicateFn).map(cell => cell.status);
    // name for vae - passedName
};

// return board with new statuses
const setStatuses = (predicateFn, status, board) => {
    return board.map(cell => (predicateFn(cell) ? { ...cell, status } : cell));
};

const canOpenAt = (i, board) => {
    // getStatuses() -- predicate isFailed || isOpen
    return (
        i < board.length &&
        isClosed(board[i]) &&
        getStatuses(cell => isFailed(cell) || isOpen(cell), board).length < 2
    ); // num 2 -> check length with function where num will be custom value
};

const canOpenCell = (i, state) => {
    return canOpenAt(i, state.board);
};

const succeedStep = state => ({
    ...state,
    board: setStatuses(isOpen, 'done', state.board),
});

const failStep = state => ({
    ...state,
    board: setStatuses(isOpen, 'failed', state.board),
});

const failClosedStep = state => ({
    ...state,
    board: setStatuses(isFailed, 'closed', state.board),
});

const getSymbolsBy = (predicateFn, board) => {
    return board.filter(predicateFn).map(cell => cell.symbol);
};

// With Ramda --> R.all(R.equal(head, tail));
const allEqual = xs => {
    // See vacuous truth!!
    if (xs.length < 2) return true;

    const [head, ...tail] = xs;
    return tail.every(it => it === head);
};

// logic with number 2 -> move to function
const areOpensEqual = board => {
    const openedCell = getSymbolsBy(isOpen, board);
    return openedCell.length >= 2 && allEqual(openedCell);
};

// logic with number 2 -> move to function
const areOpensDifferent = board => {
    const openedCell = getSymbolsBy(isOpen, board);
    return openedCell.length >= 2 && !allEqual(openedCell);
};

// Equal R.curry()
const openCell = i => state => ({
    ...state,
    board: setStatusAt(i, 'open', state.board),
});

export default function Home() {
    return <GameView />;
}

function GameView() {
    const [state, setState] = useState({
        status: statuses.Stopped,
        board: initBoard,
    });

    const { status, board } = state;

    // main login
    useEffect(() => {
        if (areOpensEqual(board)) {
            setState(succeedStep);
        } else if (areOpensDifferent(board)) {
            setState(failStep);

            // If this component state will be unmount - add logic for reset timer
            setTimeout(() => {
                setState(failClosedStep);
            }, 500);
        }
    }, [board]);

    console.log('control render main state: ', state);

    const handleScreenClick = value => {
        // array function can be moved outside the component
        setState(state => ({ ...state, status: value }));
    };

    const handleRunningClick = i => {
        if (status === 'Running' && canOpenCell(i, state)) {
            setState(openCell(i));
        }
    };

    return (
        <div style={{ padding: '48px 0' }}>
            <div style={{ position: 'absolute', top: 0, left: 0 }}>
                <button onClick={() => handleScreenClick('Stopped')}>Start screen</button>
                <button onClick={() => handleScreenClick('Running')}>Game screen</button>
                <button onClick={() => handleScreenClick('Won')}>Won screen</button>
                <button onClick={() => handleScreenClick('Lose')}>Lost screen</button>
            </div>
            <ScreenBoxView status={status} board={board} onCellClick={handleRunningClick} />
        </div>
    );
}

function ScreenBoxView(props) {
    const { status, board, onCellClick } = props;

    switch (status) {
        case 'Running':
            return <Board.View board={board} onClick={onCellClick} />;
        case 'Stopped':
            return 'This is stopped screen';
        case 'Won':
            return 'This is won screen';
        case 'Lost':
            return 'This is lost screen';
        default:
            return 'No screen';
    }
}
