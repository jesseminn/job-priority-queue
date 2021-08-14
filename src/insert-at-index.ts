import { isValidNumber } from './is-valid-number';

export const insertAtIndex = <T>(item: T, index: number, array: T[]) => {
    if (isValidNumber(index)) {
        if (index < 0) {
            array.unshift(item);
        } else {
            array.splice(index, 0, item);
        }
    } else {
        array.push(item);
    }
    return array;
};
