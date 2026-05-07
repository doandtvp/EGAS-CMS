"use client";
import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/utils";

interface AvatarProps {
  src?: string;
  name: string;
  size?: number;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, name, size = 32, className }) => {
  const [hasError, setHasError] = useState(false);

  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(-2)
    .map((w) => w[0])
    .join("")
    .toUpperCase() || name.charAt(0).toUpperCase();

  const renderPlaceholder = () => (
    <div
      className={cn(
        "rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-semibold shrink-0",
        className
      )}
      style={{ width: size, height: size, fontSize: size * 0.35 }}
    >
      {initials}
    </div>
  );

  if (!src || hasError) {
    return renderPlaceholder();
  }

  return (
    <div
      className={cn("rounded-full overflow-hidden shrink-0", className)}
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={name}
        width={size}
        height={size}
        className="object-cover w-full h-full"
        onError={() => setHasError(true)}
      />
    </div>
  );
};

export default Avatar;
