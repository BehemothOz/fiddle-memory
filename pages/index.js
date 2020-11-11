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
            <div className="top-bar">
                <Toggle onToggleClick={toggleMode} />
            </div>
            <GameView />
            <style jsx>{`
                .top-bar {
                    position: absolute;
                    top: 0;
                    left: 0;
                    display: flex;
                    justify-content: flex-end;
                    width: 100%;
                }
            `}</style>
        </>
    );
}
