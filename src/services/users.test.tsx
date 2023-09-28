import React from 'react';
import { getUsers, postUser } from './users';

// Mock global fetch API
global.fetch = jest.fn() as jest.Mock;

const mockedFetch = fetch as jest.Mock;

describe("Testing User Services", () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    mockedFetch.mockClear();
    // Spy on console.error to suppress error logs
    consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
  });

  describe('Get Users', () => {
    it("successfully fetches users", async () => {
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
      await expect(getUsers()).rejects.toThrow('Something went wrong! Please check console for errors');
    });
  })

  describe('Post Users', () => {

    it('successfully post users', async () => {
      const mockUser = { id: 'testing', name: 'marcus', email: 'marcus@gmail.com', phoneNumber: '1234567890' }


      mockedFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockUser,
      });

      const result = await postUser(mockUser);
      expect(result).toEqual(mockUser);

    })

    it('handles fetch failure in postUsers', async () => {
      const mockUser = [
        { id: 'testing', name: 'marcus', email: 'marcus@gmail.com', phoneNumber: '1234567890' }
      ]

      mockedFetch.mockResolvedValueOnce({ ok: false });
      await expect(postUser(mockUser)).rejects.toThrow('Something went wrong! Please check console for errors');
    });
  })
})  