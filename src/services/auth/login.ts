/* eslint-disable @typescript-eslint/no-explicit-any */

'use server';

import { serverFetch } from '@/lib/serverFetch';
import { parse } from 'cookie';
import { setCookie } from './tokenHandler';
import { getDefaultCookieOptions } from './cookieOptions';
import jwt, { JwtPayload } from "jsonwebtoken";
import { getDefaultDashboard } from '@/lib/auth-utils';
import { UserRole } from '@/types/enum';
import { unstable_rethrow } from 'next/navigation';
type LoginResponse = {
    success: boolean;
    message: string;
    data?: unknown;
    redirectTo?: string;
};


export const login = async (
    _prevState: unknown,
    formData: FormData
): Promise<LoginResponse> => {
    let accessTokenObject: null | any = null
    let refreshTokenObject: null | any = null


    const identifier = formData.get('identifier') as string;
    const password = formData.get('password') as string;

    if (!identifier || !password) {
        return {
            success: false,
            message: 'LoginId and password are required.',
        };
    }

    try {

        const res = await serverFetch.post('/auth/login', {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ identifier, password }),
        });

        const result = await res.json();

        if (!res.ok) {

            return {
                success: false,
                message: result.message || "Login failed",
            };
        }
        const setCookieheaders = res.headers.getSetCookie();
        if (setCookieheaders && setCookieheaders.length > 1) {
            setCookieheaders.forEach((cookie: string) => {
                const parseCookie = parse(cookie)
                if (parseCookie.accessToken) {
                    accessTokenObject = parseCookie;
                }
                if (parseCookie.refreshToken) {
                    refreshTokenObject = parseCookie;
                }
            })
        } else {
            throw new Error("Tokens not found in cookies")
        }
        // console.log({ accessTokenObject, refreshTokenObject });
        await setCookie("accessToken", accessTokenObject.accessToken, {
            ...getDefaultCookieOptions(),
            maxAge: Number(accessTokenObject["Max-Age"]) || 3600
        })
        await setCookie("refreshToken", refreshTokenObject.refreshToken, {
            ...getDefaultCookieOptions(),
            maxAge: Number(refreshTokenObject["Max-Age"]) || 7776000
        })

        const decodedToken = jwt.decode(accessTokenObject.accessToken) as JwtPayload | string
        if (
            !decodedToken ||
            typeof decodedToken === "string"
        ) {
            throw new Error("Invalid token format");
        }


        const defaultDashboard =
            getDefaultDashboard(
                decodedToken.role as UserRole
            );

        return {
            success: true,
            message: "login success",
            redirectTo: defaultDashboard,
        };
    } catch (error: any) {
        unstable_rethrow(error);
        console.error('Login error:', error);

        return {
            success: false,
            message:
                error?.message || "Login failed",
        };
    }
}