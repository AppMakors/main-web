import { useEffect } from "react";

export default function useKeyEvent(ref, eventType, keyCode, action, preventRepeat = false) {
    useEffect(() => {
        const keyEventFilter = (e) => {
            if (preventRepeat && e.repeat)
                return;

            if (e.code === keyCode) {
                action();
            }
        }

        document.addEventListener(eventType, keyEventFilter, true);

        return () => document.removeEventListener(eventType, keyEventFilter, true);
    }, [ref]);
}