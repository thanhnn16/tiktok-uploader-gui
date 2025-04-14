'use client';

import { Button } from '@nextui-org/react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'; // Assuming you'll install heroicons

export function ThemeSwitcher() {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	const toggleTheme = () => {
		setTheme(theme === 'light' ? 'dark' : 'light');
	};

	return (
		<Button isIconOnly onClick={toggleTheme} variant="light" aria-label="Toggle theme">
			{theme === 'light' ? (
				<MoonIcon className="h-5 w-5" />
			) : (
				<SunIcon className="h-5 w-5" />
			)}
		</Button>
	);
} 