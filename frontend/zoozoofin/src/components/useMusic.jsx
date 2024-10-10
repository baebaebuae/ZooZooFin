import { useState, useEffect, useRef } from 'react';

export const useMusic = () => {
    const [isMusicOn, setIsMusicOn] = useState(() => {
        const savedState = localStorage.getItem('isMusicOn');
        return savedState ? JSON.parse(savedState) : false;
    });

    const audioRef = useRef(null);

    const toggleMusic = () => {
        const newMusicState = !isMusicOn;
        setIsMusicOn(newMusicState);
        localStorage.setItem('isMusicOn', JSON.stringify(newMusicState));

        if (newMusicState) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    };

    useEffect(() => {
        if (audioRef.current && isMusicOn) {
            audioRef.current.play();
        } else if (audioRef.current) {
            audioRef.current.pause();
        }
    }, [isMusicOn]);

    return {
        isMusicOn,
        toggleMusic,
        audioRef,
    };
};
