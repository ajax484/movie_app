import { ProfileData } from "@/types/profile";
import { SupabaseClient } from "@supabase/supabase-js";
import { useCallback, useEffect, useState } from "react";

interface useGetProfileParams {
  id: string | undefined;
  supabase: SupabaseClient;
}

export const useGetProfile = ({ id, supabase }: useGetProfileParams) => {
  const [profile, setProfile] = useState<ProfileData>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const getProfile = useCallback(async () => {
    try {
      if (!id) return;
      setLoading(true);

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`full_name, username, website, avatar_url`)
        .eq("id", id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      console.log(error, data);

      if (data) {
        setProfile(data);
      }
    } catch (error) {
      console.log(error);
      alert("Error loading user data!");
    } finally {
      setLoading(false);
    }
  }, [id, supabase]);

  useEffect(() => {
    getProfile();
  }, [id, getProfile]);

  return { profile, getProfile, loading, error };
};

interface useUpdateProfileParams {
  supabase: SupabaseClient;
}

export const useUpdateProfile = ({ supabase }: useUpdateProfileParams) => {
  const [loading, setLoading] = useState<boolean>(false);

  async function updateProfile(profile: ProfileData) {
    try {
      setLoading(true);
      console.log(profile);

      const { error } = await supabase
        .from("profiles")
        .upsert({
          ...profile,
          updated_at: new Date().toISOString(),
        })
        .eq("id", profile.id);
      if (error) throw error;
      alert("Profile updated!");
    } catch (error) {
      console.log(error);
      alert("Error updating the data!");
    } finally {
      setLoading(false);
    }
  }

  return { updateProfile, loading };
};
