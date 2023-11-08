"use client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function AuthForm() {
  const supabase = createClientComponentClient();

  const baseURL =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_APP_URL // Production URL
      : "http://localhost:3000";

  return (
    <Auth
      supabaseClient={supabase}
      view="magic_link"
      appearance={{ theme: ThemeSupa }}
      showLinks={false}
      providers={[]}
      redirectTo={`${baseURL}/auth/callback`}
    />
  );
}
