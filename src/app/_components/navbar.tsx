import {
  Root,
  NavigationMenuItem,
  NavigationMenuLink,
  List,
} from '@radix-ui/react-navigation-menu';

export function Navbar() {
  return (
    <Root className="flex flex-row justify-end p-5">
      <List className="flex flex-row">
        <NavigationMenuItem>
          <NavigationMenuLink
            href={'/'}
            className="mx-auto rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-black/10"
          >
            Home
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href={'/ocr'}
            className="mx-auto rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-black/10"
          >
            OCR
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href={'/api/auth/signout'}
            className="mx-auto rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-black/10"
          >
            Sign Out
          </NavigationMenuLink>
        </NavigationMenuItem>
      </List>
    </Root>
  );
}
