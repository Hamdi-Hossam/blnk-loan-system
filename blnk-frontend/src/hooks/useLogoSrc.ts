import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export const useLogoSrc = () => {
  const { resolvedTheme } = useTheme();
  const [logoSrc, setLogoSrc] = useState("/assets/blnk.png");

  useEffect(() => {
    setLogoSrc(
      resolvedTheme === "dark" ? "/assets/blnk_white.png" : "/assets/blnk.png"
    );
  }, [resolvedTheme]);

  return logoSrc;
};
