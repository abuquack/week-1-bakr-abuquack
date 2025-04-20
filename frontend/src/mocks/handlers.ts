/* eslint-disable @typescript-eslint/no-explicit-any */
import { http, HttpResponse } from "msw";

interface UserType {
  id: string;
  name: string;
  email: string;
  password: string;
}

interface SessionType {
  token: string;
  userId: string;
}

const generateToken = (): string => crypto.randomUUID();

const users: UserType[] = [];
const sessions: SessionType[] = [];

const findUserByEmail = (email: string) => {
  return users.find((user: UserType) => user.email === email);
}

const findUserById = (id: string) => {
  return users.find((user: UserType) => user.id === id)
}

const findSessionByToken = (token: string | undefined) => {
  return sessions.find((session: SessionType) => session.token === token);
}


export const handlers = [
  // Register User
  http.post('/api/auth/signup', async ({ request }) => {
    const { email, password, name }: any = await request.json();

    if (!email || !password) {
      return HttpResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    if (findUserByEmail(email)) {
      return HttpResponse.json(
        { message: 'Email already registered' },
        { status: 400 }
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
    sessions.push({ token, userId: newUser.id });

    return HttpResponse.json(
      {
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email
        }
      },
      {
        status: 201,
        headers: {
          'Set-Cookie': `session=${token}; Path=/; HttpOnly;`
        }
      }
    )
  }),

  // Login User
  http.post('/api/auth/login', async ({ request }) => {
    const { email, password }: any = await request.json();
    const user = findUserByEmail(email);

    if (!user || user.password !== password) {
      return HttpResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const token = generateToken();
    sessions.push({ token, userId: user.id });

    return HttpResponse.json(
      {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        }
      },
      {
        status: 200,
        headers: {
          'Set-Cookie': `session=${token}; Path=/; HttpOnly`,
        },
      }
    );
  }),


  // Current user data
  http.get('/api/auth/me', async ({ cookies }) => {
    const sessionToken = cookies.session;

    const session = findSessionByToken(sessionToken);
    if (!session) {
      return new HttpResponse(null, { status: 401 });
    }

    const user = findUserById(session.userId);

    if (!user) {
      return new HttpResponse(null, { status: 401 });
    }

    return HttpResponse.json({
      id: user.id,
      name: user.name,
      email: user.email
    });
  }),


  // Logout
  http.post('/api/auth/logout', async ({ cookies }) => {
    const sessionToken = cookies.session;

    if (sessionToken) {
      const sessionIndex = sessions.findIndex(s => s.token === sessionToken)
      if (sessionIndex !== -1) sessions.splice(sessionIndex, 1);
    }

    return new HttpResponse(null, {
      status: 204,
      headers: {
        'Set-Cookie': 'session=; Path=/; Max-Age=0; HttpOnly',
      }
    },
    );
  }),
]