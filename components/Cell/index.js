// TODO: statues - this is constants
const statuses = {
    open: 'green',
    failed: 'red',
    done: 'orange',
    closed: 'gray',
};

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
                margin: 2,
                color: status === 'closed' ? 'gray' : 'inherit',
                backgroundColor: statuses[status]
            }}
            onClick={handleClick}
        >
            {symbol}
        </div>
    );
};

View.defaultProps = {
    cell: {
        symbol: '',
        status: 'closed',
    },
};
