'use client';

import { SessionProvider } from 'next-auth/react';
import React from 'react';

interface SessionProviderProps {
	children?: React.ReactNode;
}

export function NextAuthProvider({ children }: SessionProviderProps) {
	return <SessionProvider>{children}</SessionProvider>;
}
