import { SiteHeaderTheme } from '../cellular/SiteHeader';
import { ThemeSetterTheme } from './ThemeSetter';

export enum ThemeType {
    NORMAL = 'Normal',
    DARK = 'Dark',
}

export type ThemeStringType = 'Normal' | 'Dark'

export const getThemeType = (type: ThemeStringType): ThemeType => {
    if (type === 'Normal') return ThemeType.NORMAL;
    if (type === 'Dark')   return ThemeType.DARK;
    return ThemeType.NORMAL;
}


export type ThemeSetter = (themeType: ThemeType) => void;

export type Theme = SiteHeaderTheme | ThemeSetterTheme;