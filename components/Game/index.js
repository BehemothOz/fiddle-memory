import { useEffect, useState } from 'react';
import * as Board from '../Board';
import * as Cell from '../Cell';
import { ScreenView } from '../Screen';

import { initBoard } from './mock';

export const GameStatus = {
    STOPPED: 'Stopped',
    RUNNING: 'Running',
    WON: 'Won',
    LOST: 'Lost',
};

const canOpen = (i, board) => {
    return (
        i < board.length &&
        Cell.isClosed(board[i]) &&
        Board.getStatuses(cell => Cell.isFailed(cell) || Cell.isOpen(cell), board).length < 2
    ); // num 2 -> check length with function where num will be custom value
};

const canOpenCell = (i, state) => {
    return canOpen(i, state.board);
};

// Equal R.curry()
const openCell = i => state => ({
    ...state,
    board: Board.setStatus(i, Cell.Status.OPEN, state.board),
});

// Equal R.curry()
const toggleScreen = value => state => ({ ...state, status: value });

export function GameView() {
    /*
     * one-dimensional - array
     * two-dimensional - matrix
     */
    const [state, setState] = useState({
        status: GameStatus.Stopped,
        board: initBoard,
    });

    const { status, board } = state;

    useEffect(() => {
        if (Board.areOpensEqual(board)) {
            setState(Board.succeedStep);
        } else if (Board.areOpensDifferent(board)) {
            setState(Board.failStep);

            // If this component state will be unmount - add logic for reset timer
            setTimeout(() => {
                setState(Board.failClosedStep);
            }, 500);
        }
    }, [board]);

    console.log('control render main state: ', state);

    const handleScreenClick = value => {
        setState(toggleScreen(value));
    };

    const handleRunningClick = i => {
        if (status === GameStatus.RUNNING && canOpenCell(i, state)) {
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
            return <ScreenView>'This is stopped screen'</ScreenView>;
        case 'Won':
            return <ScreenView>'This is won screen'</ScreenView>;
        case 'Lost':
            return 'This is lost screen';
        default:
            return 'No screen';
    }
}
