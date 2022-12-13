import { useEffect, useState } from 'react'
import './../index.css'

export const useTheme = () => {
    const [theme, setTheme] = useState('light');
    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    };

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);
    
    return { toggleTheme}
  }