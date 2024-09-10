import React from "react";
import { LogOut } from "lucide-react";
import { getAuth } from "@/features/auth/queries/get-auth";
import { signOut } from "@/features/auth/actions/sign-out";
import Link from "next/link";
import { Button } from "../ui/button";

const AuthNav = async () => {
  const { user } = await getAuth();
  const authNav = user ? (
    <>
      <form action={signOut}>
        <Button
          size={"sm"}
          variant="outline"
          type="submit"
          className="flex gap-1 justify-center items-center"
        >
          <LogOut className="h-4 w-4" />
          <span>Log out</span>
        </Button>
      </form>
    </>
  ) : (
    <div className="space-x-2">
      <Link href="/sign-in">
        <Button variant="outline" size="sm">
          Log In
        </Button>
      </Link>
      <Link href="/sign-up">
        <Button size="sm">Sign Up</Button>
      </Link>
    </div>
  );
  return authNav;
};

export default AuthNav;
