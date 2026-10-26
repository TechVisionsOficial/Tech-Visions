import type { Metadata } from "next";

// Linked from the admin layout only, so the public site is never offered as an install.
export const metadata: Metadata = {
  manifest: "/admin.webmanifest",
  appleWebApp: {
    capable: true,
    title: "TV Admin",
    statusBarStyle: "default",
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-paper text-ink antialiased">{children}</div>;
}
