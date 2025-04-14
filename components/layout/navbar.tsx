'use client'

import React from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import { ThemeSwitcher } from "@/components/theme-switcher";

export function AppNavbar() {
  return (
    <Navbar isBordered>
      <NavbarBrand>
        <p className="font-bold text-inherit">TIKTOK UPLOADER</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
} 