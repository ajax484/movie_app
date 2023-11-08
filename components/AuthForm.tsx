"use client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function AuthForm() {
  const supabase = createClientComponentClient();

  const baseURL = process.env.NEXT_PUBLIC_APP_URL;

  return (
    <Auth
      supabaseClient={supabase}
      localization={{
        variables: {
          sign_in: {
            email_label: "Your email address",
            password_label: "Your strong password",
          },
        },
      }}
      view={"magic_link"}
      providers={[]}
      appearance={{ theme: ThemeSupa }}
      redirectTo={`${baseURL}/auth/callback`}
      showLinks={false}
    />
  );
}
