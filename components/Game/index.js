import { useEffect, useState } from 'react';
import * as Board from '../Board';
import * as Cell from '../Cell';
import { ScreenView } from '../Screen';

import { Spades } from '../Icon/Spades'

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

const hasWinningCond = state => {
    const doneCell = state.board.filter(Cell.isDone);
    return doneCell.length === state.board.length;
};

export function GameView() {
    /*
     * one-dimensional - array
     * two-dimensional - matrix
     */
    const [state, setState] = useState({
        status: GameStatus.Stopped,
        board: Board.makeRandom(3, 2),
    });

    const { status, board } = state;

    useEffect(() => {
        if (state.status === GameStatus.RUNNING && hasWinningCond(state)) {
            /*
                - write setStatusFunction
                - add delay for win step
            */
            setState(prev => ({
                ...prev,
                status: GameStatus.WON,
            }));
        }
    }, [state]);

    useEffect(() => {
        if (Board.areOpensEqual(board)) {
            setState(Board.succeedStep);
        }
        // else if (Board.areOpensDifferent(board)) {
        //     console.log('!!!!!!!!!!!!!!!!')
        //     setState(Board.failStep);

        //     // If this component state will be unmount - add logic for reset timer
        //     setTimeout(() => {
        //         setState(Board.failClosedStep);
        //     }, 500);
        // }
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

            {/* spades */}
            <Spades />

            {/* clubs */}
            <svg
                width="1rem"
                style={{}}
                height="1rem"
                viewBox="0 0 32 32"
                // className={className}
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
            >
                <path d="M24.588 12.274c-1.845 0-3.503 0.769-4.683 2.022-0.5 0.531-1.368 1.16-2.306 1.713 0.441-1.683 1.834-3.803 2.801-4.733 1.239-1.193 2-2.87 2-4.734 0-3.59-2.859-6.503-6.4-6.541-3.541 0.038-6.4 2.951-6.4 6.541 0 1.865 0.761 3.542 2 4.734 0.967 0.93 2.36 3.050 2.801 4.733-0.939-0.553-1.806-1.182-2.306-1.713-1.18-1.253-2.838-2.022-4.683-2.022-3.575 0-6.471 2.927-6.471 6.541s2.897 6.542 6.471 6.542c1.845 0 3.503-0.792 4.683-2.045 0.525-0.558 1.451-1.254 2.447-1.832-0.094 4.615-2.298 8.005-4.541 9.341v1.179h12v-1.179c-2.244-1.335-4.448-4.726-4.541-9.341 0.995 0.578 1.922 1.274 2.447 1.832 1.18 1.253 2.838 2.045 4.683 2.045 3.575 0 6.471-2.928 6.471-6.542s-2.897-6.541-6.471-6.541z"></path>
            </svg>

            {/* diamonds */}
            <svg
                width="1rem"
                style={{}}
                height="1rem"
                viewBox="0 0 32 32"
                // className={className}
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
            >
                <path d="M16 0l-10 16 10 16 10-16z"></path>
            </svg>

            {/* heart */}
            <svg
                width="1rem"
                style={{}}
                height="1rem"
                viewBox="0 0 32 32"
                // className={className}
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
            >
                <path d="M23.6 2c-3.363 0-6.258 2.736-7.599 5.594-1.342-2.858-4.237-5.594-7.601-5.594-4.637 0-8.4 3.764-8.4 8.401 0 9.433 9.516 11.906 16.001 21.232 6.13-9.268 15.999-12.1 15.999-21.232 0-4.637-3.763-8.401-8.4-8.401z"></path>

            </svg>
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
