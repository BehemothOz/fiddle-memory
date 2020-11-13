import * as Icon from '../../icons';

export const Status = {
    OPEN: 'open',
    FAILED: 'failed',
    DONE: 'done',
    CLOSED: 'closed',
};

export const isOpen = cell => cell.status === Status.OPEN;
export const isFailed = cell => cell.status === Status.FAILED;
export const isDone = cell => cell.status === Status.DONE;
export const isClosed = cell => cell.status === Status.CLOSED;

const ClassByStatus = {
    [Status.OPEN]: 'open',
    [Status.FAILED]: 'fail',
    [Status.DONE]: 'done',
    [Status.CLOSED]: 'close',
};

const UNKNOWN_CLASS = 'unknown';

export const getClassName = status => {
    if (status && status in ClassByStatus) return ClassByStatus[status];
    return UNKNOWN_CLASS;
};

export const IconByValue = {
    1: Icon.Spade,
    2: Icon.Clubs,
    3: Icon.Diamond,
    4: Icon.Heart,
    5: Icon.Truck,
    6: Icon.Power,
    7: Icon.Star,
    8: Icon.Smile,
};

/*
    Name Cell will be reserved for type
*/
export const View = props => {
    const { cell, offset, onClick } = props;
    const { symbol, status, icon: Icon } = cell;

    const handleClick = () => onClick(offset);

    return (
        <>
            <div
                style={{
                    color: isClosed(cell) ? '#353D50' : 'inherit',
                    cursor: isClosed(cell) ? 'pointer' : 'inherit',
                }}
                className={`cell ${getClassName(status)}`}
                onClick={handleClick}
            >
                <Icon />
            </div>
            <style jsx>{`
                .cell {
                    border-radius: 4px;
                }
                .cell {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 48px;
                }

                .open {
                    background-color: #4caf50;
                }

                .fail {
                    background-color: #ff3e3e;
                }

                .done {
                    background-color: transparent;
                    border: 1px solid #353d50;
                }

                .close {
                    background-color: #353d50;
                }

                .unknown {
                    background-color: black;
                }
            `}</style>
        </>
    );
};

View.defaultProps = {
    cell: {
        symbol: '',
        status: Status.CLOSED,
    },
};
