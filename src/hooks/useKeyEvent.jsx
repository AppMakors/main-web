import { useEffect } from "react";

/**
 * A manually defined hook to listen to key event
 * @param {*} ref a reference to html component
 * @param {*} eventType event type of event listener
 * @param {*} keyCode key's code
 * @param {*} action a function to be called when the event occurs
 * @param {*} preventRepeat prevent key from repeating, [false] if it's not passed to the function
 */
export function useKeyEvent(ref, eventType, keyCode, action, preventRepeat = false) {
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