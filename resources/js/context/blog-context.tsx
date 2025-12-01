import { createContext, useEffect, useState, type ReactNode } from 'react';

interface BlogContextType {
    isDarkMode: boolean;
    toggleTheme: () => void;
    isMobileMenuOpen: boolean;
    toggleMobileMenu: () => void;
    musicOpen: boolean;
    toggleMusic: () => void;
    newsOpen: boolean;
    toggleNews: () => void;
    connectOpen: boolean;
    toggleConnect: () => void;
    isSearchOpen: boolean;
    toggleSearch: () => void;
    bgClass: string;
    textClass: string;
    cardBg: string;
    borderClass: string;
    setIsMobileMenuOpen: (open: boolean) => void;
}

export const BlogContext = createContext<BlogContextType | undefined>(
    undefined,
);

interface BlogProviderProps {
    children: ReactNode;
}

export const BlogProvider = ({ children }: BlogProviderProps) => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
        // Load the saved theme when the app starts
        const saved = localStorage.getItem('theme');
        return saved === 'dark';
    });

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [musicOpen, setMusicOpen] = useState(false);
    const [newsOpen, setNewsOpen] = useState(false);
    const [connectOpen, setConnectOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    // Sync HTML tag and localStorage on theme change
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    const toggleTheme = () => setIsDarkMode((prev) => !prev);
    const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
    const toggleMusic = () => setMusicOpen((prev) => !prev);
    const toggleNews = () => setNewsOpen((prev) => !prev);
    const toggleConnect = () => setConnectOpen((prev) => !prev);
    const toggleSearch = () => {
        setIsSearchOpen((prev) => !prev);
        if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    };

    const bgClass = isDarkMode ? 'bg-[#060A1A]' : 'bg-gray-100';
    const textClass = isDarkMode ? 'text-gray-100' : 'text-gray-900';
    const cardBg = isDarkMode ? 'bg-[#0D1226]' : 'bg-white';
    const borderClass = isDarkMode ? 'border-gray-700' : 'border-gray-100';

    const value: BlogContextType = {
        isDarkMode,
        toggleTheme,
        isMobileMenuOpen,
        toggleMobileMenu,
        musicOpen,
        toggleMusic,
        newsOpen,
        toggleNews,
        connectOpen,
        toggleConnect,
        isSearchOpen,
        toggleSearch,
        bgClass,
        textClass,
        cardBg,
        borderClass,
        setIsMobileMenuOpen,
    };

    return (
        <BlogContext.Provider value={value}>{children}</BlogContext.Provider>
    );
};
