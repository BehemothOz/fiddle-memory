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
