import { simpleCalculator, Action } from './index';

const testCases = [
  {
    input: { a: 4, b: 2, action: Action.Add },
    expected: 6,
    testName: 'add two numbers',
  },
  {
    input: { a: 4, b: 2, action: Action.Subtract },
    expected: 2,
    testName: 'subtract two numbers',
  },
  {
    input: { a: 4, b: 2, action: Action.Multiply },
    expected: 8,
    testName: 'multiply two numbers',
  },
  {
    input: { a: 4, b: 2, action: Action.Divide },
    expected: 2,
    testName: 'divide two numbers',
  },
  {
    input: { a: 4, b: 2, action: Action.Exponentiate },
    expected: 16,
    testName: 'exponential two numbers',
  },
  {
    input: { a: 4, b: 2, action: 'unknown' },
    expected: null,
    testName: 'return null if action invalid',
  },
  {
    input: { a: 4, b: 'unknown', action: Action.Exponentiate },
    expected: null,
    testName: 'return null if value invalid',
  },
];

describe('simpleCalculator', () => {
  it.each(testCases)('should $testName', ({ input, expected }) => {
    expect(simpleCalculator(input)).toEqual(expected);
  });
});
