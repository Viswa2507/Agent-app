import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const secretKey = 'your-secret-key-min-32-chars-long!!!!!';
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(key);
}

export async function decrypt(token: string): Promise<any> {
  const { payload } = await jwtVerify(token, key);
  return payload;
}

export async function login(formData: { email: string; password: string }) {
  // In a real app, you would verify against a database
  const adminCredentials = {
    email: 'viswa@gmail.com',
    password: 'viswa@2003',
  };

  if (
    formData.email === adminCredentials.email &&
    formData.password === adminCredentials.password
  ) {
    const token = await encrypt({
      email: formData.email,
      role: 'admin',
    });

    cookies().set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400, // 24 hours
    });

    return { success: true, role: 'admin' };
  }

  // Here you would check agent credentials against your database
  // For demo purposes, we'll accept any email that's not the admin email
  // with a matching password
  if (formData.email !== adminCredentials.email && formData.password.length >= 6) {
    const token = await encrypt({
      email: formData.email,
      role: 'agent',
    });

    cookies().set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400,
    });

    return { success: true, role: 'agent' };
  }

  return { success: false, error: 'Invalid credentials' };
}

export async function logout() {
  cookies().delete('token');
}

export async function getSession() {
  const token = cookies().get('token')?.value;
  if (!token) return null;
  try {
    return await decrypt(token);
  } catch (error) {
    return null;
  }
}

export async function updateSession(session: any) {
  const token = await encrypt(session);
  cookies().set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 86400,
  });
}