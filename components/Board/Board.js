import * as Cell from '../Cell';
import { setStatuses } from './helpers';
import { allEqual } from '../../libs';

export const succeedStep = state => ({
    ...state,
    board: setStatuses(Cell.isOpen, Cell.Status.DONE, state.board),
});

export const failStep = state => ({
    ...state,
    board: setStatuses(Cell.isOpen, Cell.Status.FAILED, state.board),
});

export const failClosedStep = state => ({
    ...state,
    board: setStatuses(Cell.isFailed, Cell.Status.CLOSED, state.board),
});

// logic with number 2 -> move to function
export const areOpensEqual = board => {
    const openedCell = getSymbolsBy(isOpen, board);
    return openedCell.length >= 2 && allEqual(openedCell);
};

// logic with number 2 -> move to function
export const areOpensDifferent = board => {
    const openedCell = getSymbolsBy(isOpen, board);
    return openedCell.length >= 2 && !allEqual(openedCell);
};

export const View = props => {
    const { board, onClick: onCellClick } = props;

    return board.map((cell, i) => {
        return <Cell.View key={i} offset={i} cell={cell} onClick={onCellClick} />;
    });
};

export const ScreenView = props => {
    const { children } = props;
    return <div className="screen">{children}</div>;
};

View.defaultProps = {
    board: [],
};
