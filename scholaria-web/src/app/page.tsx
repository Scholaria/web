"use client";

import { useAuth } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push('/');
    } else {
      router.push('/welcome');
    }
  }, [isSignedIn, router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">Welcome to Scholaria</h1>
      <p className="text-lg text-muted-foreground">
        Your academic companion for a better learning experience
      </p>
    </div>
  );
}
