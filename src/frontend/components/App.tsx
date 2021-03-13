import React from 'react';
import { ThemeProvider } from 'styled-components';
// @ts-ignore
import { QueryClient, QueryClientProvider } from 'react-query';

import AppRouter from './AppRouter';
import { useTBTheme as useTheme } from './theme/useTBTheme';
import ThemeSetter from './theme/ThemeSetter';

const queryClient = new QueryClient();
 
const App = () => {
    const {
        theme,
        setTheme,
    } = useApp();
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <AppRouter 
                    themeSetter={
                        <ThemeSetter 
                            setTheme={setTheme} 
                        />
                    } 
                />
            </ThemeProvider>
        </QueryClientProvider>
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