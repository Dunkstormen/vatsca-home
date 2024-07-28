"use client"

import * as React from "react"
import { ExternalLinkIcon } from './icons/ExternalLinkIcon';

import { cn } from "../lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "./ui/Navigation-menu"

type NavigationItem = {
    title: string; href: string; description: string, external?: boolean
}
type NavigationItems = Array<NavigationItem>;

const community: NavigationItems = [
    {
        title: "Forum",
        href: "https://forum.vatsim-scandinavia.org",
        description: "For longer discussions",
        external: true,
    },
    {
        title: "Discord",
        href: "http://discord.vatsim-scandinavia.org/",
        description: "For chatting and quick questions",
        external: true,
    },
]

const gettingstarted: NavigationItems = [
    {
        title: "New to VATSIM",
        href: "https://vatsim.net/docs/basics/getting-started",
        description: "VATSIM 101",
        external: true,
    },
    {
        title: "Joining VATSCA",
        href: "https://wiki.vatsim-scandinavia.org/books/getting-started-AVr/chapter/joining-vatsim-scandinavia",
        description: "Transfering to Scandinavia",
        external: true,
    },
    {
        title: "ATC Training",
        href: "https://cc.vatsim-scandinavia.org/",
        description: "Apply for a controller rating",
        external: true,
    },
    {
        title: "Pilot Traning",
        href: "https://wiki.vatsim-scandinavia.org/shelves/pilot-training",
        description: "Information and applications",
        external: true,
    },
]

const components: NavigationItems = [
    {
        title: "Airports & Charts",
        href: "https://wiki.vatsim-scandinavia.org/shelves/pilots",
        description: "Our airports with charts and procedures",
        external: true,
    },
    {
        title: "Available Stands",
        href: "https://stands.vatsim-scandinavia.org/",
        description: "Live map for unoccupied stands",
        external: true,
    },
    {
        title: "Event Booking",
        href: "https://booking.vatsim-scandinavia.org/",
        description: "Book slots for our larger events here",
        external: true,
    },
]

const controllers: NavigationItems = [
    {
        title: "Wiki",
        href: "https://wiki.vatsim-scandinavia.org/",
        description: "Documents and procedures",
        external: true,
    },
    {
        title: "Control Center",
        href: "https://cc.vatsim-scandinavia.org/",
        description: "Rosters, bookings and applications",
        external: true,
    },
    {
        title: "Training Department",
        href: "https://wiki.vatsim-scandinavia.org/books/training-documents",
        description: "FAQ, documentation and information",
        external: true,
    },
    {
        title: "Visiting Controllers",
        href: "https://wiki.vatsim-scandinavia.org/books/training-documents/page/transfer-and-visiting-policy-in-vatsim-scandinavia",
        description: "Information regarding visiting ratings",
        external: true,
    },   
]

const about: NavigationItems = [
    {
        title: "Staff",
        href: "/about/staff",
        description:
        "List with roles and contact information",
    },
    {
        title: "Contact Us",
        href: "/about/contact",
        description: "Get in touch with us",
    },
    {
        title: "Constitution & Policies",
        href: "https://wiki.vatsim-scandinavia.org/shelves/vacc-documents",
        description: "Privacy, graphical profile & more",
        external: true,
    },
    {
        title: "Donations",
        href: "/about/donations",
        description: "Help us keep VATSCA running!",
    },
]

export default function Navigation() {
    return (
        <NavigationMenu >
            <NavigationMenuList className="flex flex-col md:flex-row w-full items-center">
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Community</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-3 p-6 w-[100%] md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                            {community.map((component) => (
                                <ListItem
                                    key={component.title}
                                    title={component.title}
                                    href={component.href}
                                    external={component.external}
                                >
                                    {component.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[100%] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                            {gettingstarted.map((component) => (
                                <ListItem
                                    key={component.title}
                                    title={component.title}
                                    href={component.href}
                                    external={component.external}
                                >
                                    {component.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Pilots</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[100%] l-0 gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                            {components.map((component) => (
                                <ListItem
                                    key={component.title}
                                    title={component.title}
                                    href={component.href}
                                    external={component.external}
                                >
                                    {component.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Controllers</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[100%] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                            {controllers.map((component) => (
                                <ListItem
                                    key={component.title}
                                    title={component.title}
                                    href={component.href}
                                    external={component.external}
                                >
                                    {component.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>About</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[100%] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                            {about.map((component) => (
                                <ListItem
                                    key={component.title}
                                    title={component.title}
                                    href={component.href}
                                    external={component.external}
                                >
                                    {component.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

interface NavigationListItemProps extends React.ComponentPropsWithoutRef<"a"> {
    title: string;
    external?: boolean;
}

const ListItem = React.forwardRef<HTMLAnchorElement, NavigationListItemProps>(
    ({ className, title, children, external, ...props }, ref) => {
        return (
            <li>
                <NavigationMenuLink asChild>
                    <a
                        ref={ref}
                        target={external ? "_blank" : undefined}
                        className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                            className
                        )}
                        {...props}
                    >
                        <div className="text-sm font-medium leading-none">
                            {title}
                            {external == true && <ExternalLinkIcon width="0.75rem" marginLeft="0.3rem" />}
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {children}
                        </p>
                    </a>
                </NavigationMenuLink>
            </li>
        )
    })
ListItem.displayName = "ListItem"
