// Uncomment the code below and write your tests
// import { generateLinkedList } from './index';

import { generateLinkedList } from './index';

const linkedList = ['abc', {}, 21, []];

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    expect(generateLinkedList(linkedList)).toStrictEqual({
      next: {
        next: {
          next: {
            next: {
              next: null,
              value: null,
            },
            value: [],
          },
          value: 21,
        },
        value: {},
      },
      value: 'abc',
    });
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    expect(generateLinkedList(linkedList)).toMatchSnapshot();
  });
});
