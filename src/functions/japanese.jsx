export function myRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Fisher–Yates Shuffle Algorithm: https://bost.ocks.org/mike/shuffle/
export function shuffle(a) {
    var m = a.length, i;

    while (m) {
        i = Math.floor(Math.random() * m--);
        [a[m], a[i]] = [a[i], a[m]]; 
    }

    return a;
}