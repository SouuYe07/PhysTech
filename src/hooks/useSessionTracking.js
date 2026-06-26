import { useEffect, useRef, useCallback } from 'react';
import { supabase, sessionChannel } from '../lib/supabase';

export function useSessionTracking(
    isActive, 
    isPaused,
    isLeader,
    onLocationUpdate,
) {
    const intervalRef = useRef(null);
    const distanceRef = useRef(0);
    const lastPosRef = useRef(null);

    const getDistance = (a, b) => {
         const R = 6371;
        const dLat = (b.lat - a.lat) * Math.PI / 180;
        const dLng = (b.lng - a.lng) * Math.PI / 180;
        const x = Math.sin(dLat / 2) ** 2 +
            Math.cos(a.lat * Math.PI / 180) *
            Math.cos(b.lat * Math.PI / 180) *
            Math.sin(dLng / 2) ** 2;
        return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
    };

    const startBroadcasting = useCallback(() => {
        intervalRef.current = setInterval(async () => {
            const mockLat = 14.5 + Math.random() * 0.001;
            const mockLng = 121.0 + Math.random() * 0.001;

            if (lastPosRef.current) {
                const distance = getDistance(lastPosRef.current, { lat: mockLat, lng: mockLng });
                distanceRef.current += distance;
            }
            lastPosRef.current = { lat: mockLat, lng: mockLng };

            const pace = distanceRef.current > 0
                ? (Date.now() / 1000 / 60) / distanceRef.current
                : 0;

            await sessionChannel.send({
                type: 'broadcast',
                event: 'location',
                payload: {
                    distance_km: parseFloat(distanceRef,current.toFixed(3)),
                    pace: parseFloat(pace.toFixed(2)),
                    lat: mockLat,
                    lng: mockLng,
                },
            });
        }, 1000);
    }, []);

    const saveSession = useCallback(async (durationSeconds) => {
        const { error } = await supabase.from('sessions').insert({
            distance_km: distanceRef.current,
            pace_min_per_km: durationSeconds > 0
                ? parseFloat((durationSeconds / 60 / distanceRef.current).toFixed(2))
                : 0,
        });

        if (error) console.log('Save error:', error);
        else console.log('Session saved!');
        distanceRef.current = 0;
        lastPosRef.current = null;
    }, []);


    useEffect(() => {
        sessionChannel
            .on('broadcast', { event: 'location' }, ({ payload }) => {
                if (!isLeader) onLocationUpdate(payload);
            })
            .subscribe((status) => {
                console.log('Channel status:', status);
            });

        return () => supabase.removeChannel(sessionChannel);
    }, []);

    useEffect(() => {
        if (isActive && !isPaused && isLeader) {
            startBroadcasting();
        } else {
            clearInterval(intervalRef.current);
        }
        return () => clearInterval(intervalRef.current);
    }, [isActive, isPaused, isLeader]);

    return { saveSession };
}