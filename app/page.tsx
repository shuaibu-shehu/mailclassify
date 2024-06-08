import Oauth from "@/components/oauth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex gap-8   min-h-screen flex-col items-center justify-center p-24">
    <Oauth />
    </main>
  );
}
