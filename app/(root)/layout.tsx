"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ClientPreventHydration from "@/components/PreventHydration";
import { useGetProfile } from "@/hooks/profile";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface SiteProps {
  children: React.ReactNode;
}

const Layout = ({ children }: SiteProps) => {
  const { session } = useSessionContext();
  const user = session?.user;
  const supabase = createClientComponentClient();
  const {
    profile,
    getProfile,
    loading: fetchingProfile,
    error,
  } = useGetProfile({ supabase, id: user?.id || "" });

  const router = useRouter();

  useEffect(() => {
    if (session?.user.id) {
      router.push("/");
    }
  }, [session, router]);

  return (
    <ClientPreventHydration>
      {/* header */}
      <Header profile={profile} loading={fetchingProfile} user={user} />
      <main className="py-20 min-h-[90vh]">{children}</main>
      <Footer />
    </ClientPreventHydration>
  );
};

export default Layout;
