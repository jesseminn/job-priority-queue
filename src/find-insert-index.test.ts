import { findInsertIndex } from './find-insert-index';

test('Test findInsertIndex', () => {
    const arr = [1, 3, 3, 3, 5, NaN, NaN];
    const num = undefined;
    expect(findInsertIndex(arr, num)).toBe(7);
});
