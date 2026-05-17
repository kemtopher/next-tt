'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';

import { useSoundCloudProvider } from '../SoundCloudProviderContext/SoundCloudProviderContext';
import styles from './SoundCloud.module.css';

const SOUNDCLOUD_WIDGET_SCRIPT_ID = 'soundcloud-widget-api-script';
const PLAYER_SRC =
    'https://w.soundcloud.com/player/?visual=false&scrolling=false&show_artwork=true' +
    '&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false' +
    '&url=https%3A%2F%2Fapi.soundcloud.com%2Fplaylists%2F1195714738';

export default function SoundCloudPlayer() {
    const pathname = usePathname();
    const iframeRef = useRef(null);
    const widgetRef = useRef(null);
    const [scriptReady, setScriptReady] = useState(false);
    const [hasWidget, setHasWidget] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);
    const syncPlaybackStateRef = useRef(() => {});
    const refreshMetadataRef = useRef(() => {});

    const {
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
    } = useSoundCloudProvider();

    const isHome = pathname === '/';

    useEffect(() => {
        if (typeof window === 'undefined') return undefined;
        if (window.SC?.Widget) {
            setScriptReady(true);
            return undefined;
        }

        let script = document.getElementById(SOUNDCLOUD_WIDGET_SCRIPT_ID);
        if (!script) {
            script = document.createElement('script');
            script.id = SOUNDCLOUD_WIDGET_SCRIPT_ID;
            script.src = 'https://w.soundcloud.com/player/api.js';
            script.async = true;
            document.body.appendChild(script);
        }

        const onLoad = () => setScriptReady(true);
        script.addEventListener('load', onLoad);
        return () => script?.removeEventListener('load', onLoad);
    }, []);

    useEffect(() => {
        if (!scriptReady || !iframeRef.current || widgetRef.current || !window.SC?.Widget) return undefined;

        const widget = window.SC.Widget(iframeRef.current);
        widgetRef.current = widget;
        setHasWidget(true);

        const hydrateSoundMeta = () => {
            widget.getCurrentSound((sound) => {
                if (!sound) return;
                setTrackTitle(sound.title || '');
                setAuthorName(sound.user?.username || '');
                setThumbnailUrl(sound.user?.avatar_url || sound.artwork_url || '');
            });
        };

        const syncPlaybackState = () => {
            widget.isPaused((paused) => {
                setIsPlaying(!paused);
                if (!paused) {
                    setHasStarted(true);
                    setIsDismissed(false);
                }
            });

            widget.getPosition((position) => {
                if (position > 0) {
                    setHasStarted(true);
                }
            });
        };

        refreshMetadataRef.current = hydrateSoundMeta;
        syncPlaybackStateRef.current = syncPlaybackState;

        widget.bind(window.SC.Widget.Events.READY, () => {
            setIsReady(true);
            hydrateSoundMeta();
            syncPlaybackState();
        });
        widget.bind(window.SC.Widget.Events.PLAY, () => {
            setHasStarted(true);
            setIsPlaying(true);
            setIsDismissed(false);
            hydrateSoundMeta();
        });
        widget.bind(window.SC.Widget.Events.PAUSE, () => setIsPlaying(false));
        widget.bind(window.SC.Widget.Events.FINISH, () => setIsPlaying(false));

        return () => {
            if (!window.SC?.Widget || !widgetRef.current) return;
            widgetRef.current.unbind(window.SC.Widget.Events.READY);
            widgetRef.current.unbind(window.SC.Widget.Events.PLAY);
            widgetRef.current.unbind(window.SC.Widget.Events.PAUSE);
            widgetRef.current.unbind(window.SC.Widget.Events.FINISH);
        };
    }, [
        scriptReady,
        setAuthorName,
        setHasStarted,
        setIsPlaying,
        setIsReady,
        setThumbnailUrl,
        setTrackTitle,
    ]);

    useEffect(() => {
        if (!isReady || !widgetRef.current) return;
        refreshMetadataRef.current();
        syncPlaybackStateRef.current();
    }, [pathname, isReady]);

    useEffect(() => {
        if (isHome || isDismissed || !isReady || !widgetRef.current) return;

        // Fallback for cases where SoundCloud widget callbacks lag across route changes.
        setHasStarted(true);
    }, [isDismissed, isHome, isReady, setHasStarted]);

    useEffect(() => {
        if (isHome || !isReady || hasStarted || !widgetRef.current) return undefined;

        const intervalId = window.setInterval(() => {
            syncPlaybackStateRef.current();
            refreshMetadataRef.current();
        }, 800);

        return () => {
            window.clearInterval(intervalId);
        };
    }, [hasStarted, isHome, isReady]);

    const iframeModeClass = useMemo(() => {
        if (isHome) return styles.iframeHostHome;
        return styles.iframeHostDocked;
    }, [isHome]);

    const handlePrev = () => {
        if (!widgetRef.current) return;
        widgetRef.current.prev();
        window.setTimeout(() => {
            refreshMetadataRef.current();
            syncPlaybackStateRef.current();
        }, 250);
    };

    const handleNext = () => {
        if (!widgetRef.current) return;
        widgetRef.current.next();
        window.setTimeout(() => {
            refreshMetadataRef.current();
            syncPlaybackStateRef.current();
        }, 250);
    };

    const handleTogglePlayPause = () => {
        if (!widgetRef.current) return;
        if (isPlaying) {
            widgetRef.current.pause();
            setIsPlaying(false);
            window.setTimeout(() => {
                syncPlaybackStateRef.current();
            }, 150);
            return;
        }
        widgetRef.current.play();
        setIsPlaying(true);
        setHasStarted(true);
        setIsDismissed(false);
        window.setTimeout(() => {
            refreshMetadataRef.current();
            syncPlaybackStateRef.current();
        }, 250);
    };

    const handleClose = () => {
        if (widgetRef.current) {
            widgetRef.current.pause();
            widgetRef.current.seekTo(0);
        }
        setIsPlaying(false);
        setHasStarted(false);
        setIsDismissed(true);
    };

    const showMini =
        !isHome && !isDismissed && (hasStarted || isPlaying || isReady || scriptReady);

    return (
        <section className={styles.playerRoot} aria-label="SoundCloud player">
            <div className={`${styles.iframeHost} ${iframeModeClass}`}>
                <iframe
                    ref={iframeRef}
                    title="SoundCloud playlist"
                    width="100%"
                    height={isHome ? '600' : '1'}
                    scrolling="no"
                    frameBorder="0"
                    allow="autoplay; encrypted-media; picture-in-picture; clipboard-write"
                    src={PLAYER_SRC}
                />
            </div>

            {showMini && (
                <aside className={styles.miniPlayer} aria-label="Mini SoundCloud controls">
                    <button type="button" className={styles.closeButton} onClick={handleClose} aria-label="Close player">
                        X
                    </button>
                    {thumbnailUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={thumbnailUrl}
                            alt={authorName || 'SoundCloud account'}
                            width={50}
                            height={50}
                            className={styles.thumbnail}
                        />
                    ) : (
                        <div className={styles.thumbnailFallback}>TT</div>
                    )}
                    <div className={styles.metaBlock}>
                        <p className={styles.author}>{authorName || 'TT Mahony'}</p>
                        <p className={styles.track}>{trackTitle || 'SoundCloud Playlist'}</p>
                    </div>
                    <div className={styles.controls}>
                        <button type="button" className={styles.controlButton} onClick={handlePrev} disabled={!hasWidget}>
                            Prev
                        </button>
                        <button
                            type="button"
                            className={styles.controlButton}
                            onClick={handleTogglePlayPause}
                            disabled={!hasWidget}
                        >
                            {isPlaying ? 'Pause' : 'Play'}
                        </button>
                        <button type="button" className={styles.controlButton} onClick={handleNext} disabled={!hasWidget}>
                            Next
                        </button>
                    </div>
                </aside>
            )}
        </section>
    );
}
