import * as Cell from '../Cell';
import { setStatuses, getSymbols } from './helpers';
import { allEqual, shuffle } from '../../libs';

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
    const openedCell = getSymbols(Cell.isOpen, board);
    return openedCell.length >= 2 && allEqual(openedCell);
};

// logic with number 2 -> move to function
export const areOpensDifferent = board => {
    const openedCell = getSymbols(Cell.isOpen, board);
    return openedCell.length >= 2 && !allEqual(openedCell);
};

export const makeRandom = (n, m) => {
    const ff = Array((n * m) / 2)
        .fill()
        .map((_, i) => i + 1);

    const aa = ff.flatMap(it => [it, it]);

    const hh = shuffle(aa);

    const ss = hh.map(it => ({ symbol: it, status: Cell.Status.OPEN }))
    console.log(ss)
    return ss;
};

export const View = props => {
    const { board, onClick: onCellClick } = props;

    return board.map((cell, i) => {
        return <Cell.View key={i} offset={i} cell={cell} onClick={onCellClick} />;
    });
};

View.defaultProps = {
    board: [],
};
