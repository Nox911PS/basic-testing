import { simpleCalculator, Action, RawCalculatorInput } from './index';

describe('simpleCalculator tests', () => {
  let value: RawCalculatorInput;

  beforeEach(() => {
    value = { a: 4, b: 2, action: Action.Add };
  });

  test('should add two numbers', () => {
    expect(simpleCalculator(value)).toEqual(6);
  });

  test('should subtract two numbers', () => {
    value.action = Action.Subtract;

    expect(simpleCalculator(value)).toEqual(2);
  });

  test('should multiply two numbers', () => {
    value.action = Action.Multiply;

    expect(simpleCalculator(value)).toEqual(8);
  });

  test('should divide two numbers', () => {
    value.action = Action.Divide;

    expect(simpleCalculator(value)).toEqual(2);
  });

  test('should exponentiate two numbers', () => {
    value.action = Action.Exponentiate;

    expect(simpleCalculator(value)).toEqual(16);
  });

  test('should return null for invalid action', () => {
    value.action = 'unknown';

    expect(simpleCalculator(value)).toEqual(null);
  });

  test('should return null for invalid arguments', () => {
    value.a = 'unknown';

    expect(simpleCalculator(value)).toEqual(null);
  });
});
