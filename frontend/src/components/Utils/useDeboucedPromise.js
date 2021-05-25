import { useRef } from "react";

export default function useDeboucedPromise(fn, delay) {
    let timeoutRef = useRef();

    function handler(...params) {
        return new Promise((resolve, reject) => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = window.setTimeout(async() => {

                try {
                    const response = await fn(...params);

                    resolve(response)
                } catch (e) {
                    reject(e);
                }
            }, delay);
        });
    }
    return handler;
}