"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";
const NoImageFoundToRename = ({
  title,
  svgLight,
  svgDark,
}: {
  title: string;
  svgLight: string;
  svgDark: string;
}) => {
  const { resolvedTheme } = useTheme();
  const [noImageFoundToRename, setNoImageFoundToRename] = useState("");
  useEffect(() => {
    setNoImageFoundToRename(resolvedTheme === "light" ? svgLight : svgDark);
  }, [resolvedTheme]);
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <p
        className={`sm:text-xl  text-main-400  lg:text-3xl  dark:text-[#ffffff]   font-normal `}
      >
        {title}
      </p>
      <Image
        src={noImageFoundToRename}
        alt="No Image Found To Rename"
        width={500}
        height={500}
      />
    </div>
  );
};

export default NoImageFoundToRename;
