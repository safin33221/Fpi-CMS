// services/auth/login.ts
'use server';

import { serverFetch } from '@/lib/serverFetch';

export const login = async (
    _prevState: unknown,
    formData: FormData
): Promise<{
    success: boolean;
    message: string;
    redirectTo?: string;
}> => {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
        return {
            success: false,
            message: 'Email and password are required.',
        };
    }

    try {

        const response = await serverFetch.post('/auth/login', {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const result = await response.json();

        if (!response.ok) {

            return {
                success: false,
                message: result.message,
            };
        }

        return {
            success: true,
            message: 'Login successful',
        };
    } catch (error) {
        console.error('Login error:', error);
        return {
            success: false,
            message: 'something went wrong',
        };
    }
}