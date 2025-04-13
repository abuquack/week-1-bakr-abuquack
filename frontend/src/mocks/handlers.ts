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
    const { email, password } = await request.json();

    if (email === 'abuquack@gmail.com' && password === '123456') {
      return HttpResponse.json({
        token: fakeToken,
        user: fakeUser,
      });
    }

    return new HttpResponse(JSON.stringify(
      {
        message: "Invalid user", status: 401, headers: { 'Content-Type': 'application/json' },
      }))
  }),

  http.post('/api/auth/register', async ({ request }) => {
    const { email, name } = await request.json();

    return HttpResponse.json({
      token: fakeToken,
      user: { ...fakeUser, name, email }
    }, { status: 201 })
  }),


  http.get('/api/auth/me', ({ request }) => {
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.replace('Bearer', '');

    if (token === fakeToken) {
      return HttpResponse.json({ user: fakeUser });
    }

    return new HttpResponse(JSON.stringify({ message: 'UNauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }),
]