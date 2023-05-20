import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import type { inferProcedureOutput } from "@trpc/server";
import type { AppRouter } from "@pickle-app/api";
import { useAuth, useClerk } from "@clerk/nextjs";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Welcome</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/pickle-icon.png" />
      </Head>
      <main className="flex h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-8">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Welcome to{" "}
            <span className="text-[hsl(280,100%,70%)]">Palisade</span>
          </h1>
          <AuthShowcase />
        </div>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { isSignedIn } = useAuth();
  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
    undefined,
    { enabled: !!isSignedIn },
  );
  const { user } = useUser();
  console.log();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {isSignedIn && (
        <>
          <p className="text-center text-2xl text-white">
            {secretMessage && (
              <span>
                {" "}
                {secretMessage + " " + user?.firstName}
                <br />
              </span>
            )}
          </p>
          <div className="flex items-center justify-center">
            <SignOutButton />
          </div>
        </>
      )}
      {!isSignedIn && (
        <p className="text-center text-2xl text-white">
          <Link href="/sign-in">Sign In</Link>
        </p>
      )}
    </div>
  );
};

const SignOutButton: React.FC = () => {
  const { signOut } = useClerk();
  return (
    <button
      onClick={() => {
        signOut();
      }}
    >
      Sign out
    </button>
  );
};
