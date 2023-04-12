<script>
    import {
        Button,
        Header,
        HeaderNav,
        HeaderNavItem,
        HeaderNavMenu,
        SideNav,
        SideNavItems,
        SideNavLink,
        SideNavMenu,
        SideNavMenuItem,
        SkipToContent
    } from 'carbon-components-svelte';

    export let data
    import {enhance} from "$app/forms";

    let isSideNavOpen = false;
</script>

<Header
        persistentHamburgerMenu={true}
        company="Cafe Connect"
        bind:isSideNavOpen
>
    <svelte:fragment slot="skip-to-content">
        <SkipToContent/>
    </svelte:fragment>
    <HeaderNav>
        <HeaderNavItem href="/" text="Home"/>
        <HeaderNavItem href="https://shop.cafeconnect.net" text="Shop"/>
        <HeaderNavMenu text="Admin">
            <HeaderNavItem href="/admin/gdt" text="GDT"/>
            <HeaderNavItem href="/admin/recipients" text="Recipients"/>
            <HeaderNavItem href="/admin/email" text="Email"/>
            <HeaderNavItem href="/admin/validate" text="Validate"/>
        </HeaderNavMenu>
        <form action="/logout" method="post" use:enhance>
            <Button kind="danger-tertiary" type="submit">Log out</Button>
        </form>
        <HeaderNavItem text="Log in" href="/login"/>
    </HeaderNav>
</Header>

<SideNav bind:isOpen={isSideNavOpen}>
    <SideNavItems>
        <SideNavLink href="/" text="Home"/>
        <SideNavLink href="https://shop.cafeconnect.net" text="Shop"/>
        <SideNavMenu text="Admin">
            <SideNavMenuItem href="/admin/gdt" text="GDT"/>
            <SideNavMenuItem href="/admin/recipients" text="Recipients"/>
            <SideNavMenuItem href="/admin/email" text="Email"/>
            <SideNavMenuItem href="/admin/validate" text="Validate"/>
        </SideNavMenu>
        <form action="/logout" method="post">
            <Button kind="danger-tertiary" type="submit">Log out</Button>
        </form>
        <SideNavLink text="Log in" href="/login"/>
    </SideNavItems>
</SideNav>
