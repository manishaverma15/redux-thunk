import axios from 'axios';

export type User = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
}

const BASE_URL = 'api/users';

export async function getUsers(): Promise<User[]> {
  const response = await axios.get(BASE_URL);

  console.log(response)

  return response.data.map((user: any) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    phoneNumber: user.phoneNumber
  }));
}

export async function postUser(postData: any): Promise<User> {
  const response = await axios.post(BASE_URL, postData)
  console.log('response', response.data)
  return response.data;
}