import { insertAtIndex } from './insert-at-index';

test('Test insertAtIndex', () => {
    const arr = [1, 2, 3];
    insertAtIndex(42, 1, arr);
    expect(arr).toStrictEqual([1, 42, 2, 3]);
});
