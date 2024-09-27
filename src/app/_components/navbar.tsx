'use client';

import * as NavigationMenu from '@radix-ui/react-navigation-menu';

export function Navbar() {
  return (
    <NavigationMenu.Root className="flex flex-row justify-end p-5">
      <NavigationMenu.NavigationMenuList className="">
        <NavigationMenu.NavigationMenuItem>
          <NavigationMenu.NavigationMenuLink
            href={'/api/auth/signout'}
            className="mx-auto rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-black/10   "
          >
            Sign Out
          </NavigationMenu.NavigationMenuLink>
        </NavigationMenu.NavigationMenuItem>
      </NavigationMenu.NavigationMenuList>
    </NavigationMenu.Root>
  );
}
