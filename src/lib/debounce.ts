import {useEffect, useState} from "preact/hooks";

export function useDebounce<V>(value: V, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timer);
        };

    }, [value, delay]);

    return debouncedValue;
}
