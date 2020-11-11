import { ThemeProvider } from '../providers/ThemeProvider';
import { GameView } from '../components/Game';
import { createTheme } from '../theme';
import { useThemeMode } from '../hooks/useThemeMode';

/*
    !Steps:
    * 1. logic without Ramda
    * 2. logic with Ramda
    * 2.1 experiment with export / import (tree shacking)
    * 3. styles
    ? 4. type
*/

export default function HomePage() {
    const [mode, toggleMode] = useThemeMode();

    const theme = createTheme({ type: mode });

    return (
        <ThemeProvider theme={theme}>
            <button
                type="checkbox"
                style={{ position: 'absolute', bottom: 50 }}
                onClick={e => {
                    console.log(e.target.checked);
                    toggleMode(e.target.checked);
                }}
            >
                Toggle
            </button>
            <GameView />;
        </ThemeProvider>
    );
}
