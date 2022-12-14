import { useEffect, useState } from 'react'
import './../index.css'

export const useTheme = () => {
    const [theme, setTheme] = useState(
        sessionStorage.getItem('theme') || 'light'
    );

    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    };

    useEffect(() => {
        sessionStorage.setItem('theme', theme);
        document.body.className = theme;
    }, [theme]);
    
    return { toggleTheme}
  }