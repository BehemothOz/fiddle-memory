import { useState } from 'react';
import { ThemeProvider } from '../providers/ThemeProvider';
import { GameView } from '../components/Game';
import { createTheme } from '../styles/theme';

/*
    !Steps:
    * 1. logic without Ramda
    * 2. logic with Ramda
    * 2.1 experiment with export / import (tree shacking)
    * 3. styles
    ? 4. type
*/

export const useDarkMode = () => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        console.log('toggleTheme call');
        if (theme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    };

    return [theme, toggleTheme];
};

export default function HomePage() {
    const [mode, toggleTheme] = useDarkMode();

    const theme = createTheme({ type: mode });
    console.log(theme);
    return (
        <ThemeProvider theme={theme}>
            <button
                type="checkbox"
                style={{ position: 'absolute', bottom: 50 }}
                onClick={e => {
                    console.log(e.target.checked);
                    toggleTheme(e.target.checked);
                }}
            >
                Toggle
            </button>
            <GameView />;
        </ThemeProvider>
    );
}
