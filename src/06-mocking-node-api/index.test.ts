// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

import { join } from 'path';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';

jest.mock('path');
jest.mock('fs');
jest.mock('fs/promises');

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');

    const callback = jest.fn();
    const timeout = 100;
    doStuffByTimeout(callback, timeout);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 100;
    doStuffByTimeout(callback, timeout);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(200);

    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');

    const callback = jest.fn();
    const interval = 100;
    doStuffByInterval(callback, interval);

    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenCalledWith(callback, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const interval = 100;
    doStuffByInterval(callback, interval);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(400);

    expect(callback).toHaveBeenCalledTimes(4);
  });
});

describe('readFileAsynchronously', () => {
  afterAll(() => {
    jest.unmock('path');
    jest.unmock('fs');
  });

  test('should call join with pathToFile', async () => {
    const pathToFile = 'pathToFile';

    await readFileAsynchronously(pathToFile);

    expect(join).toHaveBeenCalledTimes(1);
    expect(join).toHaveBeenCalledWith(expect.anything(), pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = 'pathToFile';

    (existsSync as jest.Mock).mockReturnValueOnce(false);

    await expect(readFileAsynchronously(pathToFile)).resolves.toEqual(null);
  });

  test('should return file content if file exists', async () => {
    const pathToFile = 'pathToFile';
    const fileContent = 'fileContent';

    (existsSync as jest.Mock).mockReturnValueOnce(true);
    (readFile as jest.Mock).mockResolvedValue(fileContent);

    await expect(readFileAsynchronously(pathToFile)).resolves.toEqual(
      fileContent,
    );
  });
});
