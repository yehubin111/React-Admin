import React, { useState, useEffect, useRef, useCallback } from "react";

export const useSafeState = (oldState) => {
    const [state, changeState] = useState(oldState);
    let isUnMounted = false;

    useEffect(() => {
        return () => {
            isUnMounted = true;
        }
    }, [])
    function callback(newState) {
        !isUnMounted && changeState(newState);
    }
    return [state, callback];
}

// 定时器
export const useInterval = (callback, delay, interval_) => {
    const savedCallback = useRef("");
    let isUnMounted = false;

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback])
    useEffect(() => {
        return () => {
            isUnMounted = true;
        }
    }, [])

    return useCallback(() => {
        let interval = null;

        function tick() {
            if (isUnMounted)
                return clearInterval(interval);
            savedCallback.current(interval);
        }

        if (delay) {
            interval = setInterval(tick, delay);
        }
    }, [delay])
}