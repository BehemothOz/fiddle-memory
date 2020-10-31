import { Status } from './status';

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
