// With Ramda --> R.all(R.equal(head, tail));
export const allEqual = xs => {
    // See vacuous truth!!
    if (xs.length < 2) return true;

    const [head, ...tail] = xs;
    return tail.every(it => it === head);
};

export const shuffle = someArray => {
    for (let i = someArray.length - 1; i > 0; i--) {
        const randomPosition = Math.floor(Math.random() * i);

        [someArray[i], someArray[randomPosition]] = [someArray[randomPosition], someArray[i]];
    }

    return someArray;
};
