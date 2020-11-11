import { GameView } from '../components/Game';
import { Toggle } from '../components/Toggle';

/*
    !Steps:
    * 1. logic without Ramda
    * 2. logic with Ramda
    * 2.1 experiment with export / import (tree shacking)
    * 3. styles
    ? 4. type
*/

export default function HomePage(props) {
    const { toggleMode } = props;

    return (
        <>
            <div style={{ position: 'absolute', right: 0 }}>
                <Toggle onToggleClick={toggleMode} />
            </div>
            <GameView />
        </>
    );
}
