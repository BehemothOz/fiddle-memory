import * as Cell from '../Cell';
import { getSymbols } from './helpers';
import { allEqual, shuffle } from '../../libs';

export type Board = Cell.Cell[];

type BoardViewProps = {
    board: Board;
    onClick: (offset: number) => void;
};

// logic with number 2 -> move to function
export const areOpensEqual = (board: Board): boolean => {
    const openedCell = getSymbols(Cell.isOpen, board);
    return openedCell.length >= 2 && allEqual(openedCell);
};

// logic with number 2 -> move to function
export const areOpensDifferent = (board: Board): boolean => {
    const openedCell = getSymbols(Cell.isOpen, board);
    return openedCell.length >= 2 && !allEqual(openedCell);
};

export const makeRandom = (n: number) => {
    // if (n / 2 % 2 === 0) return;

    const values: number[] = new Array(n / 2).fill(null).map((_, i) => i + 1);

    const doubleValues = values.flatMap(it => [it, it]);

    return shuffle(doubleValues).map((it: number) => ({
        symbol: it,
        status: Cell.Status.CLOSED,
        icon: Cell.IconByValue[it],
    }));
};

export const View: React.FC<BoardViewProps> = props => {
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
