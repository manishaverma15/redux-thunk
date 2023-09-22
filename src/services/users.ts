import React from 'react';

export type User = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
}

const BASE_URL = 'api/users';

export async function getUsers(): Promise<User[]> {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data.map((user: any) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
    }));
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

export async function postUser(postData: any): Promise<User> {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error posting user:', error);
    throw error;
  }
}
