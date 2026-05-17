'use client';

import { createContext, useContext, useMemo, useState } from 'react';

const SoundCloudProviderContext = createContext(null);

export function SoundCloudProvider({ children }) {
    const [hasStarted, setHasStarted] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [thumbnailUrl, setThumbnailUrl] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [trackTitle, setTrackTitle] = useState('');

    const value = useMemo(
        () => ({
            hasStarted,
            setHasStarted,
            isPlaying,
            setIsPlaying,
            isReady,
            setIsReady,
            thumbnailUrl,
            setThumbnailUrl,
            authorName,
            setAuthorName,
            trackTitle,
            setTrackTitle,
        }),
        [hasStarted, isPlaying, isReady, thumbnailUrl, authorName, trackTitle]
    );

    return (
        <SoundCloudProviderContext.Provider value={value}>
            {children}
        </SoundCloudProviderContext.Provider>
    );
}

export function useSoundCloudProvider() {
    const context = useContext(SoundCloudProviderContext);

    if (!context) {
        throw new Error('useSoundCloudProvider must be used within a SoundCloudProvider');
    }

    return context;
}
