// services/auth/login.ts
'use server';

import { serverFetch } from '@/lib/serverFetch';

export async function login(
    _prevState: unknown,
    formData: FormData
): Promise<{
    success: boolean;
    message: string;
    redirectTo?: string;
}> {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
        return {
            success: false,
            message: 'Email and password are required.',
        };
    }

    try {
        console.log({ email, password });
        const response = await serverFetch.post('/auth/login', {
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            let errorMessage = 'Login failed. Please check your credentials.';
            try {
                const errorData = await response.json();
                errorMessage = errorData.message || errorMessage;
            } catch {
                // ignore if response is not JSON
            }
            return {
                success: false,
                message: errorMessage,
            };
        }

        // If your backend returns user data or a token, parse it
        const data = await response.json();

        // Optionally set a cookie or session here using Next.js cookies()
        // const cookies = require('next/headers').cookies;
        // (await cookies()).set('token', data.token, { httpOnly: true, secure: true });

        return {
            success: true,
            message: 'Login successful',
            redirectTo: '/dashboard', // where to redirect after login
        };
    } catch (error) {
        console.error('Login error:', error);
        return {
            success: false,
            message: 'Failed to connect to the server. Please try again later.',
        };
    }
}