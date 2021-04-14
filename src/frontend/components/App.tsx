import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
// @ts-ignore
import { QueryClient, QueryClientProvider } from 'react-query';

import AppRouter from './AppRouter';
import { useTBTheme as useTheme } from './theme/useTBTheme';
import ThemeSetter from './theme/ThemeSetter';

const AppStyles = styled.div`
    font-size: 1.6rem;
`;

const queryClient = new QueryClient();
 
const App = () => {
    const {
        theme,
        setTheme,
    } = useApp();
    return (
        <AppStyles>
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
        </AppStyles>
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