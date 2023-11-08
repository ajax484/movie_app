"use client";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Avatar from "@/components/Avatar";
import { useGetProfile, useUpdateProfile } from "@/hooks/profile";
import { useSessionContext } from "@supabase/auth-helpers-react";
import Loading from "@/components/Loading";

export default function AccountForm() {
  const supabase = createClientComponentClient();
  const [fullname, setFullname] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [avatar_url, setAvatarUrl] = useState<string>("");
  const { session } = useSessionContext();
  const user = session?.user;

  const {
    profile,
    getProfile,
    loading: fetchingProfile,
    error,
  } = useGetProfile({ supabase, id: user?.id });
  const { updateProfile, loading: updatingProfile } = useUpdateProfile({
    supabase,
  });

  useEffect(() => {
    if (fetchingProfile) return;

    if (profile) {
      // Make sure profile is not null before accessing its properties
      if (profile.full_name) {
        setFullname(profile.full_name);
      }
      if (profile.username) {
        setUsername(profile.username);
      }
      if (profile.website) {
        setWebsite(profile.website);
      }
      if (profile.avatar_url) {
        setAvatarUrl(profile.avatar_url);
      }
    }
  }, [user, profile, fetchingProfile]);

  return (
    <Loading loading={fetchingProfile}>
      <div className="p-4 rounded-lg">
        <Avatar
          uid={(user && user.id) || ""}
          url={avatar_url || ""}
          size={150}
          onUpload={(url) => {
            updateProfile({
              id: (user && user.id) || "",
              avatar_url: url,
            });
            setAvatarUrl(url);
          }}
        />
        <div className="mt-4">
          <label htmlFor="email" className="text-gray-600">
            Email
          </label>
          <input
            id="email"
            type="text"
            value={session?.user.email}
            disabled
            className="border border-gray-300 p-2 w-full rounded-md"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="fullName" className="text-gray-600">
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            value={fullname || ""}
            onChange={(e) => setFullname(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded-md"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="username" className="text-gray-600">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username || ""}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded-md"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="website" className="text-gray-600">
            Website
          </label>
          <input
            id="website"
            type="url"
            value={website || ""}
            onChange={(e) => setWebsite(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded-md"
          />
        </div>
        <div className="mt-4">
          <button
            className="bg-sky-600 hover:opacity-75 text-white rounded-md py-2 px-4"
            onClick={() =>
              updateProfile({
                id: (user && user.id) || "",
                full_name: fullname,
                username,
                website,
                avatar_url,
              })
            }
            disabled={fetchingProfile || updatingProfile}
          >
            {updatingProfile ? "Loading..." : "Update"}
          </button>
        </div>
      </div>
    </Loading>
  );
}
