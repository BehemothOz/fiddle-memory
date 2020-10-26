import { useState } from 'react';
import * as Board from '../components/Board';

// one-dimensional - array
// two-dimensional - matrix

// TODO: statues - this is constants from Cell file
const initBoard = [
    { symbol: 'A', status: 'closed' },
    { symbol: 'A', status: 'closed' },
    { symbol: 'B', status: 'closed' },
    { symbol: 'B', status: 'closed' },
];

let statuses = {
    Stopped: 'Stopped',
    Running: 'Running',
    Won: 'Won',
    Lost: 'Lost',
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

    const handleScreenClick = value => {
        // array function can be moved outside the component
        setState(state => ({ ...state, status: value }));
    };

    const handleRunningClick = i => {
        if (status === 'Running') {
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
    console.log(board);
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
