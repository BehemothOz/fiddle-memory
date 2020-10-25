import { useState } from 'react';
import * as Board from '../components/Board';

// one-dimensional - array
// two-dimensional - matrix

// TODO: statues - this is constants from Cell file
const board = [
    { symbol: 'A', status: 'closed' },
    { symbol: 'A', status: 'open' },
    { symbol: 'B', status: 'done' },
    { symbol: 'B', status: 'failed' },
];

let statuses = {
    Stopped: 'Stopped',
    Running: 'Running',
    Won: 'Won',
    Lost: 'Lost',
};

export default function Home() {
    return <GameView />;
}

function GameView() {
    const [state, setState] = useState({
        status: statuses.Stopped,
    });

    const { status } = state;

    const handleScreenClick = value => {
        setState(() => ({ status: value }));
    };

    return (
        <div style={{ padding: '48px 0' }}>
            <div style={{ position: 'absolute', top: 0, left: 0 }}>
                <button onClick={() => handleScreenClick('Stopped')}>Start screen</button>
                <button onClick={() => handleScreenClick('Running')}>Game screen</button>
                <button onClick={() => handleScreenClick('Won')}>Won screen</button>
                <button onClick={() => handleScreenClick('Lose')}>Lost screen</button>
            </div>
            <ScreenBoxView status={status} board={board} />
        </div>
    );
}

function ScreenBoxView(props) {
    const { status, board } = props;

    switch (status) {
        case 'Running':
            return (
                <Board.View
                    board={board}
                    onClick={args => {
                        console.log(args);
                    }}
                />
            );
        case 'Stopped':
            return 'This is stopped screen';
        case 'Won':
            return 'This is won screen';
        case 'Lost':
            return 'This is lost screen';
        default:
            return 'No screen';
    }
}
