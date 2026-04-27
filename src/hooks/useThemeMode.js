import { useContext } from 'react';
import { ThemeContext } from '../context/theme/ThemeContext';

export const useThemeMode = () => useContext(ThemeContext);
