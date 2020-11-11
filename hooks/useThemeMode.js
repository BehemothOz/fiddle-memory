import { useState, useCallback } from 'react';

export const isLight = mode => mode === 'light';
export const isDark = mode => mode === 'dark';

const setModeTheme = state => (isLight(state) ? 'dark' : 'light');

/*
    To interact localStorage
*/

export const useThemeMode = () => {
    const [mode, setMode] = useState('light');

    const toggleMode = useCallback(() => setMode(setModeTheme), []);

    return [mode, toggleMode];
};
