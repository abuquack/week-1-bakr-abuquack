/* eslint-disable @typescript-eslint/no-explicit-any */
import { http, HttpResponse } from "msw";

interface UserType {
  id: string;
  name: string;
  email: string;
  password: string;
}

const generateToken = (): string => crypto.randomUUID();

const users: UserType[] = [];

const findUserByEmail = (email: string) => {
  return users.find((user: UserType) => user.email === email);
}


export const handlers = [
  // Register User
  http.post('/api/auth/signup', async ({ request }) => {
    const { email, password, name }: any = await request.json();

    if (!email || !password) {
      return new HttpResponse(
        JSON.stringify({ message: 'Email and password are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (findUserByEmail(email)) {
      return new HttpResponse(
        JSON.stringify({ message: 'Email already registered' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const newUser: UserType = {
      id: crypto.randomUUID(),
      name,
      email,
      password,
    }

    users.push(newUser);

    const token = generateToken();
    return new HttpResponse(
      JSON.stringify({ user: newUser }),
      {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': `session=${token}; Path/; HttpOnly`,
        },
      }
    );
  }),

  // Login User
  http.post('/api/auth/login', async ({ request }) => {
    const { email, password }: any = await request.json();
    const user = findUserByEmail(email);

    if (!user || user.password !== password) {
      return new HttpResponse(
        JSON.stringify({ message: 'Invalid email or password' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const token = generateToken();

    return new HttpResponse(
      JSON.stringify({ user }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': `session=${token}; Path=/; HttpOnly`,
        },
      }
    );
  }),

  // Current user data
  http.get('/api/auth/me', async ({ request }) => {
    const cookie = request.headers.get('cookie') || '';
    const session = cookie.match(/session=([^;]+)/)?.[1];
    
    if (!session) {
      return new HttpResponse(null, { status: 401 });
    }

    const user = users[0];
    return HttpResponse.json(user)
  }),

  // Logout
  http.post('/api/auth/logout', () => {
    return new HttpResponse(null, {
      status: 204,
      headers: {
        'Set-Cookie': 'session=; Path=/; Max-Age=0; HttpOnly',
      }
    },
    );
  }),
]