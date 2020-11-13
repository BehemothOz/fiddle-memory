import { useEffect, useState } from 'react';
import * as Board from '../Board';
import * as Cell from '../Cell';
import { ScreenView } from '../Screen';

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

const startGame = () => ({
    status: GameStatus.RUNNING,
    board: Board.makeRandom(16),
});

export function GameView() {
    /*
     * one-dimensional - array
     * two-dimensional - matrix
     */
    const [state, setState] = useState({
        ...startGame(),
        status: GameStatus.STOPPED,
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
        } else if (Board.areOpensDifferent(board)) {
            console.log('!!!!!!!!!!!!!!!!');
            setState(Board.failStep);

            // If this component state will be unmount - add logic for reset timer
            setTimeout(() => {
                setState(Board.failClosedStep);
            }, 500);
        }
    }, [board]);

    console.log('control render main state: ', state);

    const handleStartingClick = () => {
        setState(startGame);
    };

    const handleRunningClick = i => {
        if (status === GameStatus.RUNNING && canOpenCell(i, state)) {
            setState(openCell(i));
        }
    };

    return (
        <ScreenBoxView
            status={status}
            board={board}
            onStartingClick={handleStartingClick}
            onCellClick={handleRunningClick}
        />
    );
}

function ScreenBoxView(props) {
    const { status, board, onStartingClick, onCellClick } = props;

    switch (status) {
        case 'Running':
            return <Board.View board={board} onClick={onCellClick} />;
        case 'Stopped':
            return (
                <ScreenView>
                    <div style={{ textAlign: 'center' }}>
                        <h1>Memory Game</h1>
                        {/* <button className="button" onClick={onStartingClick}>Click to start</button> */}
                        <button className="button">Click to start</button>
                        {/* 017EF2 */}
                        <style jsx>{`
                            h1 {
                                margin: 0.3em;
                                font-size: 55px;
                            }

                            .button {
                                padding: 8px 16px;
                                font-size: 14px;
                                color: #1976d2;
                                background: transparent;
                                border: 1px solid #1976d2;
                                outline: none;
                                cursor: pointer;
                                text-transform: uppercase;
                            }

                            .button:hover {
                                color: #2163FF;
                                border-color: #2163FF;
                            }

                            .button:active {
                                color: #1C4BFF;
                                border-color: #1C4BFF;
                            }
                        `}
                        </style>
                    </div>
                </ScreenView>
            );
        case 'Won':
            return (
                <ScreenView>
                    <div style={{ textAlign: 'center' }}>
                        <h1>This is won screen</h1>
                        <button onClick={onStartingClick}>Click</button>
                    </div>
                </ScreenView>
            )
        case 'Lost':
            return 'This is lost screen';
        default:
            return 'Default';
    }
}
