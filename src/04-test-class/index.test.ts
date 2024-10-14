// Uncomment the code below and write your tests
import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

import lodash from 'lodash';

describe('BankAccount', () => {
  const initialFounds = 1000;
  let account: BankAccount;

  beforeEach(() => {
    account = getBankAccount(initialFounds);
  });

  test('should create account with initial balance', () => {
    expect(account).toBeDefined();
    expect(account.getBalance()).toEqual(initialFounds);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(2000)).toThrow(
      new InsufficientFundsError(initialFounds),
    );
  });

  test('should throw error when transferring more than balance', () => {
    const newAccount = new BankAccount(initialFounds);

    expect(() => account.transfer(2000, newAccount)).toThrow(
      new InsufficientFundsError(initialFounds),
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(2000, account)).toThrow(
      new TransferFailedError(),
    );
  });

  test('should deposit money', () => {
    const deposit = 20;

    expect(account.deposit(deposit).getBalance()).toEqual(
      initialFounds + deposit,
    );
  });

  test('should withdraw money', () => {
    const withdraw = 20;

    expect(account.withdraw(withdraw).getBalance()).toEqual(
      initialFounds - withdraw,
    );
  });

  test('should transfer money', () => {
    const newAccount = new BankAccount(initialFounds);
    const transferredMoney = 20;

    account.transfer(transferredMoney, newAccount);

    expect(account.getBalance()).toEqual(initialFounds - transferredMoney);
    expect(newAccount.getBalance()).toEqual(initialFounds + transferredMoney);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest.spyOn(lodash, 'random').mockReturnValueOnce(50).mockReturnValueOnce(1);

    await account.fetchBalance().then((result) => {
      expect(typeof result).toBe('number');
    });
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const currentFounds = 50;

    jest
      .spyOn(lodash, 'random')
      .mockReturnValueOnce(currentFounds)
      .mockReturnValueOnce(1);

    await account.synchronizeBalance();

    expect(account.getBalance()).toEqual(currentFounds);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest
      .spyOn(lodash, 'random')
      .mockReturnValueOnce(initialFounds)
      .mockReturnValueOnce(0);

    await expect(() => account.synchronizeBalance()).rejects.toThrow(
      new SynchronizationFailedError(),
    );
  });
});
