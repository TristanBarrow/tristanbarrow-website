import { useState } from 'react';
import { ThemeType } from './ThemeType';
import { theme as normal } from './themes/normalTheme';
import { theme as dark } from './themes/darkTheme';

export const useTBTheme = () => {
    const [themeType, setThemeTypeTo] = useState(ThemeType.NORMAL.valueOf());

    const setTheme = (themeType: ThemeType) => {
        setThemeTypeTo(themeType.valueOf());
    }

    let themes = {
        [ThemeType.NORMAL.valueOf()]: normal,
        [ThemeType.DARK.valueOf()]: dark,
    };
    
    return {
        theme: themes[themeType],
        setTheme,
    }
}

