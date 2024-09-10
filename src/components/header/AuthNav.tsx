import React from "react";
import { getAuth } from "@/features/auth/queries/get-auth";
import { signOut } from "@/features/auth/actions/sign-out";
import Link from "next/link";

const AuthNav = async () => {
  const { user } = await getAuth();
  const authNav = user ? (
    <li>
      <form action={signOut}>
        <button type="submit">Sign Out</button>
      </form>
    </li>
  ) : (
    <>
      <li>
        <Link href="/sign-up">Sign Up</Link>
      </li>
      <li>
        <Link href="/sign-in">Sign In</Link>
      </li>
    </>
  );
  return authNav;
};

export default AuthNav;
