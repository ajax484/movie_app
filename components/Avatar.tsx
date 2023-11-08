"use client";
import React, { useEffect, useRef, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";

export default function Avatar({
  uid,
  url,
  size,
  onUpload,
  hideUpload = false,
}: {
  uid: string;
  url: string;
  size: number;
  onUpload?: (url: string) => void;
  hideUpload?: boolean;
}) {
  const supabase = createClientComponentClient();
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [uploading, setUploading] = useState<boolean>(false);
  const inputRef = useRef(null);

  useEffect(() => {
    async function downloadImage(path: string) {
      try {
        const { data, error } = await supabase.storage
          .from("avatars")
          .download(path);
        if (error) {
          throw error;
        }

        const url = URL.createObjectURL(data);
        setAvatarUrl(url);
      } catch (error) {
        console.log("Error downloading image: ", error);
      }
    }

    if (url) downloadImage(url);
  }, [url, supabase]);

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `${uid}-${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload && onUpload(filePath);
      alert("Avatar uploaded successfully!");
    } catch (error) {
      console.log(error);

      alert("Error uploading avatar!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex items-center flex-col gap-4">
      {avatarUrl ? (
        <Image
          width={size}
          height={size}
          src={avatarUrl}
          alt="Avatar"
          className="border border-gray-300 rounded-full"
          style={{ height: size, width: size }}
        />
      ) : (
        <div
          className="bg-gray-300 border border-gray-300 rounded-full"
          style={{ height: size, width: size }}
        />
      )}
      <div className={`w-${size} ${hideUpload ? "hidden" : "block"}`}>
        <button
          className={`bg-sky-600 hover:opacity-75 text-white rounded-md py-2 px-4 block cursor-pointer ${
            uploading ? "opacity-50" : ""
          }`}
          // @ts-ignore
          onClick={() => inputRef.current && inputRef.current?.click()}
        >
          {uploading ? "Uploading ..." : "Upload"}
        </button>
        <input
          style={{
            visibility: "hidden",
            position: "absolute",
          }}
          type="file"
          id="image"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
          ref={inputRef}
        />
      </div>
    </div>
  );
}
