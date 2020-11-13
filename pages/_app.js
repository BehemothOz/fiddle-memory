import { ThemeProvider } from '../providers/ThemeProvider';
import { useThemeMode } from '../hooks/useThemeMode';
import { createTheme } from '../theme';

function MyApp({ Component, pageProps }) {
    const [mode, toggleMode] = useThemeMode();

    const theme = createTheme({ type: mode });

    return (
        <>
            <ThemeProvider theme={theme}>
                <div id="root">
                    <Component toggleMode={toggleMode} {...pageProps} />
                </div>
            </ThemeProvider>
            <style jsx global>{`
                html,
                body {
                    font-size: ${theme.typography.htmlFontSize};
                }

                body {
                    color: ${theme.palette.text.primary};
                    background-color: ${theme.palette.background};
                }
            `}</style>
            <style jsx global>
                {`
                    * {
                        box-sizing: border-box;
                    }

                    body {
                        margin: 0;
                        padding: 0;
                        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
                            Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
                        transition: background 0.2s ease;
                    }

                    h1 {
                        margin: 0.35em;
                        font-size: 55px;
                        line-height: 1.2;
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
        </>
    );
}

export default MyApp;
