import React, { useEffect, useState, FC } from 'react';
import * as Board from '../Board';
import * as Cell from '../Cell';
import { ScreenView } from '../Screen';
import { Button } from '../Button';

export enum GameStatus {
    STOPPED = 'Stopped',
    RUNNING = 'Running',
    WON = 'Won',
    LOST = 'Lost',
}

type State = {
    status: GameStatus;
    board: Board.Board;
};

const canOpen = (i: number, board: Board.Board): boolean => {
    // num 2 -> check length with function where num will be custom value
    return (
        i < board.length &&
        Cell.isClosed(board[i]) &&
        Board.getStatuses((cell: Cell.Cell) => Cell.isFailed(cell) || Cell.isOpen(cell), board)
            .length < 2
    );
};

const canOpenCell = (i: number, state: State): boolean => {
    return canOpen(i, state.board);
};

// Equal R.curry()
const openCell = (i: number) => (state: State): State => ({
    ...state,
    board: Board.setStatus(i, Cell.Status.OPEN, state.board),
});

export const succeedStep = (state: State): State => ({
    ...state,
    board: Board.setStatuses(Cell.isOpen, Cell.Status.DONE, state.board),
});

export const failStep = (state: State): State => ({
    ...state,
    board: Board.setStatuses(Cell.isOpen, Cell.Status.FAILED, state.board),
});

export const failClosedStep = (state: State): State => ({
    ...state,
    board: Board.setStatuses(Cell.isFailed, Cell.Status.CLOSED, state.board),
});

const hasWinningCond = (state: State): boolean => {
    const doneCell = state.board.filter(Cell.isDone);
    return doneCell.length === state.board.length;
};

const startGame = () => ({
    status: GameStatus.RUNNING,
    board: Board.makeRandom(4),
});

type ScreenBoxView = {
    status: GameStatus;
    board: Board.Board;
    onStartingClick: () => void;
    onCellClick: (offset: number) => void;
};

const ScreenBoxView: FC<ScreenBoxView> = props => {
    const { status, board, onStartingClick, onCellClick } = props;

    switch (status) {
        case 'Running':
            return <Board.View board={board} onClick={onCellClick} />;
        case 'Stopped':
            return (
                <ScreenView>
                    <div style={{ textAlign: 'center' }}>
                        <h1>Memory Game</h1>
                        <Button onClick={onStartingClick}>Click to start</Button>
                        <style jsx>{``}</style>
                    </div>
                </ScreenView>
            );
        case 'Won':
            return (
                <ScreenView>
                    <div style={{ textAlign: 'center' }}>
                        <h1>You win!</h1>
                        <Button onClick={onStartingClick}>Start new game</Button>
                        <style jsx>{``}</style>
                    </div>
                </ScreenView>
            );
        case 'Lost':
            return <span>This is lost screen</span>;
        default:
            return <span>Default</span>;
    }
};

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
            setState(succeedStep);
        } else if (Board.areOpensDifferent(board)) {
            console.log('!!!!!!!!!!!!!!!!');
            setState(failStep);

            // If this component state will be unmount - add logic for reset timer
            setTimeout(() => {
                setState(failClosedStep);
            }, 500);
        }
    }, [board]);

    console.log('control render main state: ', state);

    const handleStartingClick = () => {
        setState(startGame);
    };

    const handleRunningClick = (i: number) => {
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
