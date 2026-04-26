"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Indicator() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/") {
      return;
    }

    const follower = document.getElementById("follower");

    function updatePosition(e: MouseEvent) {
      if (!follower) {
        return;
      }

      const x = e.clientX;
      const y = e.clientY;

      follower.style.left = x + "px";
      follower.style.top = y + "px";
    }

    window.addEventListener("mousemove", updatePosition);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
    };
  }, [pathname]);

  if (pathname === "/") {
    return null;
  }

  return (
    <>
      <div id="follower"></div>
      <div id="indicator"></div>
    </>
  );
}
