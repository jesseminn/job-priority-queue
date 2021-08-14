import { isValidNumber } from './is-valid-number';

export const findInsertIndex = (arr: number[], num?: number) => {
    if (!isValidNumber(num)) return arr.length;

    let index = 0;
    while (index < arr.length - 1) {
        const curr = arr[index];
        const next = arr[index + 1];
        if (curr < num && num < next) {
            break;
        }
        index++;
    }
    return index + 1;
};
