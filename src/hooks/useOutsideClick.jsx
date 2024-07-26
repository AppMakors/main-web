import { useEffect } from "react";

/**
 * A manually defined hook to listen to changes outside a list of references
 * @param {*} listOfRefs a list of references that you want to listen to the click event outside of them
 * @param {*} action a function to be called when the event occurs
 */
export function useOutsideClick(listOfRefs, action) {
    useEffect(() => {
        function handleClickOutside(event) {
            var isOutsideClick = true;
            listOfRefs.forEach((v) => {isOutsideClick &&= v.current && !v.current.contains(event.target)});

            if (isOutsideClick) {
                action();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
    
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [listOfRefs]);
}