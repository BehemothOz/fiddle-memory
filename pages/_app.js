import { useState } from 'react';
import { ThemeProvider } from '../providers/ThemeProvider';
import '../styles/globals.css';

const light = {
    background: 'blue',
};

const dark = {
    background: 'pink',
};

const createPalette = type => {
    const types = { light, dark };

    return {
        ...types[type],
    };
};

export const createTheme = (type = 'light') => {
    return {
        type,
        palette: {
            ...createPalette(type),
        },
    };
};

function MyApp({ Component, pageProps }) {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    };

    return (
        <ThemeProvider value={createTheme(theme)}>
            <div style={{ textAlign: 'right' }}>
                <input
                    type="checkbox"
                    onClick={e => {
                        toggleTheme(e.target.checked);
                    }}
                />
            </div>
            <Component {...pageProps} />
        </ThemeProvider>
    );
}

export default MyApp;
