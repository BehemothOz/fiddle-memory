import { Status, isClosed } from './status';
import { getClassName } from './classes';

/*
    Name Cell will be reserved for type
*/
export const View = props => {
    const { cell, offset, onClick } = props;
    const { symbol, status } = cell;

    const handleClick = () => onClick(offset);

    return (
        <div
            style={{
                color: isClosed(cell) ? 'gray' : 'inherit',
            }}
            className={`cell ${getClassName(status)}`}
            onClick={handleClick}
        >
            {symbol}
        </div>
    );
};

View.defaultProps = {
    cell: {
        symbol: '',
        status: Status.CLOSED,
    },
};
