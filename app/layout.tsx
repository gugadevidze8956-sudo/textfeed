"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");

    // გვერდები სადაც login არ გვინდა
    const publicRoutes = ["/login"];

    if (!user && !publicRoutes.includes(pathname)) {
      router.push("/login");
    }

    setReady(true);
  }, [pathname]);

  if (!ready) return null;

  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
