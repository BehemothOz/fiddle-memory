import { ThemeProvider } from '../providers/ThemeProvider';
import { useThemeMode } from '../hooks/useThemeMode';
import { createTheme } from '../theme';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
    const [mode, toggleMode] = useThemeMode();

    const theme = createTheme({ type: mode });

    return (
        <ThemeProvider theme={theme}>
            <div id="root">
                <Component toggleMode={toggleMode} {...pageProps} />
            </div>
            <style jsx global>{`
                body {
                    color: ${theme.palette.text.primary};
                    background-color: ${theme.palette.background};
                }
            `}</style>
            <style jsx global>
                {`
                    body {
                        font-size: 16px;
                        transition: background 0.2s ease;
                    }

                    #root {
                        position: relative;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 100vw;
                        min-height: 100vh;
                    }
                `}
            </style>
        </ThemeProvider>
    );
}

export default MyApp;
