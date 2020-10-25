import * as Cell from '../Cell';

/*
    Name Board will be reserved for type
*/
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
