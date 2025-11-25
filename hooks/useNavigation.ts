
import React, { useState, useEffect } from 'react';
import { ViewState, Language } from '../types';
import { audioSystem } from '../services/audioSystem';

export const useNavigation = () => {
    const [view, setView] = useState<ViewState>({ type: 'home' });
    const [showTutorial, setShowTutorial] = useState(false);
    const [notification, setNotification] = useState<string | null>(null);
    
    // Grid State
    const [gridCategory, setGridCategory] = useState('All');
    const [gridSearch, setGridSearch] = useState('');
    const [gridPage, setGridPage] = useState(0);

    // Scroll Helper
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Tutorial Initialization
    useEffect(() => {
        const hasSeenTutorial = localStorage.getItem('tkynox_tutorial_seen');
        if (!hasSeenTutorial) {
            setShowTutorial(true);
        }
    }, []);

    const handleTutorialComplete = () => {
        localStorage.setItem('tkynox_tutorial_seen', 'true');
        setShowTutorial(false);
        audioSystem.playSuccess();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleReplayTutorial = () => {
        setShowTutorial(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault();
        if (targetId === 'services' || targetId === 'journal' || targetId === 'about') {
            setView({ type: 'home' });
            setTimeout(() => scrollToSection(targetId), 100);
        } else {
            setView({ type: 'home' });
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        audioSystem.playClick();
    };

    const showNotification = (msg: string, duration = 3000) => {
        setNotification(msg);
        setTimeout(() => setNotification(null), duration);
    };

    // Grid Handlers
    const handleGridCategoryChange = (cat: string) => {
        setGridCategory(cat);
        setGridPage(0); 
        audioSystem.playClick();
    };

    const handleGridSearchChange = (query: string) => {
        setGridSearch(query);
        setGridPage(0);
    };

    return {
        view,
        setView,
        scrollToSection,
        showTutorial,
        handleTutorialComplete,
        handleReplayTutorial,
        notification,
        showNotification,
        handleNavClick,
        gridCategory,
        gridSearch,
        gridPage,
        setGridPage,
        handleGridCategoryChange,
        handleGridSearchChange
    };
};
