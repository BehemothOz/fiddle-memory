// With Ramda --> R.all(R.equal(head, tail));
export const allEqual = xs => {
    // See vacuous truth!!
    if (xs.length < 2) return true;

    const [head, ...tail] = xs;
    return tail.every(it => it === head);
};