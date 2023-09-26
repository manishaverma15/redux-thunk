import { waitFor, screen } from '@testing-library/react';
import UserTable from '../features/Form/UserTable';
import render from '../utils/render';
import { getUsers } from './users';


// Mock global fetch API
global.fetch = jest.fn() as jest.Mock;

const mockedFetch = fetch as jest.Mock;

describe("Testing with API call", () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    mockedFetch.mockClear();
    // Spy on console.error to suppress error logs
    consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  it("successfully fetches and displays users", async () => {
    const mockUser = [
      { id: 'test', name: 'John Roy', email: 'john@gmail.com', phoneNumber: '1234567890' },
      { id: 'test1', name: 'Marcus Roy', email: 'marcus@gmail.com', phoneNumber: '1234563434' }
    ]

    mockedFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser,
    });

    const result = await getUsers();
    expect(result).toEqual(mockUser)
  });

  it('handles fetch failure in getUsers', async () => {
    mockedFetch.mockResolvedValueOnce({ ok: false });
    await expect(getUsers()).rejects.toThrow('Something went wrong!');
  });

})  