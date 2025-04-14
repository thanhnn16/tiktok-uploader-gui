'use client';

import * as React from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useRouter } from 'next/navigation';

export interface ProvidersProps {
	children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
	const router = useRouter();

	return (
		<NextUIProvider navigate={router.push}>
			<NextThemesProvider attribute="class" defaultTheme="dark">
				{children}
			</NextThemesProvider>
		</NextUIProvider>
	);
} 