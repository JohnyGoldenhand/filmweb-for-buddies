import React from "react";
import { ListButton, StyledNavbar } from "./component.styled";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { CenteredSection } from "~/styles/base.styled";
import Link from "next/link";

export const Navbar = () => {
  const { isSignedIn, user } = useUser();
  const handleLinkClick = () => {
    if (window.location.pathname === "/") {
      window.location.reload();
    }
  };
  return (
    <StyledNavbar>
      <Link href="/" passHref legacyBehavior>
        <a onClick={handleLinkClick}>BuddiesFW</a>
        {/*want to reaload the page*/}
      </Link>
      <CenteredSection>
        <Link href="/list">Movies to watch</Link>

        {isSignedIn ? <UserButton /> : <SignInButton />}
      </CenteredSection>
    </StyledNavbar>
  );
};
