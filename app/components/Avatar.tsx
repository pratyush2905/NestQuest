"use client";

import Image from "next/image";

const Avatar = () => {
  return (
    <Image
      className="rounbded-full"
      height={30}
      width={30}
      alt="avatar"
      src="/images/placeholder.png"
    />
  );
};

export default Avatar;
