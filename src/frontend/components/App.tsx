import React from 'react';
import { ThemeProvider } from 'styled-components';
import { useTBTheme, useTBTheme as useTheme } from './theme/useTBTheme';

const App = () => {
    const {
        theme,
        setTheme,
    } = useApp();
    return (
        <ThemeProvider theme={theme}>

        </ThemeProvider>
    );
}

const useApp = () => {
    const { theme, setTheme } = useTheme();
    return {
        theme,
        setTheme,
    }
}

export default App;