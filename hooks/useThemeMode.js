import { useState } from 'react';

export const isLight = mode => mode === 'light';
export const isDark = mode => mode === 'dark';

const setModeTheme = state => (isLight(state) ? 'dark' : 'light');

export const useThemeMode = () => {
    const [mode, setMode] = useState('light');

    const toggleMode = () => setMode(setModeTheme);

    return [mode, toggleMode];
};
