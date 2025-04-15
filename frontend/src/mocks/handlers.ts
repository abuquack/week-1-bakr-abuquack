/* eslint-disable @typescript-eslint/no-explicit-any */
import { http, HttpResponse } from "msw";

interface UserType {
  id: number;
  name: string;
  email: string;
}

const fakeToken: string = 'AKDDKFJ3AKDJ3DKJF4D';
const fakeUser: UserType = { id: 1, name: "Abuquack", email: "abuquack@gmail.com" };

export const handlers = [
  http.post('/api/auth/login', async ({ request }) => {
    console.log(request)
    const { email, password }: any = await request.json();
    console.log(await request.json());

    if (email === 'abuquack@gmail.com' && password === '123456') {
      return HttpResponse.json({
        token: fakeToken,
        user: fakeUser,
      });
    }

    return new HttpResponse(
      JSON.stringify({ message: "Invalid email or password" }),
      {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }),

]