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

export const makeRandom = n => {
    const values = new Array(n / 2).fill().map((_, i) => i + 1);

    const doubleValues = values.flatMap(it => [it, it]);

    // return shuffle(doubleValues).map(it => ({
    //     symbol: it,
    //     status: Cell.Status.CLOSED,
    //     icon: Cell.IconByValue[it],
    // }));

    return doubleValues.map(it => ({
        symbol: it,
        status: Cell.Status.CLOSED,
        icon: Cell.IconByValue[it],
    }));
};

export const View = props => {
    const { board, onClick: onCellClick } = props;

    return (
        <>
            <div className="grid">
                {board.map((cell, i) => {
                    return <Cell.View key={i} offset={i} cell={cell} onClick={onCellClick} />;
                })}
            </div>
            <style jsx>{`
                .grid {
                    width: 500px;
                    height: 500px;
                    display: grid;
                    grid-template-rows: 1fr 1fr 1fr 1fr;
                    grid-template-columns: 1fr 1fr 1fr 1fr;
                    grid-gap: 8px;
                }
            `}</style>
        </>
    );
};

View.defaultProps = {
    board: [],
};
