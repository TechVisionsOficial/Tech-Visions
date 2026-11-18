import { ViewTransition } from "react";

// Templates remount on every navigation, so each page enters and leaves through
// this boundary: the old page lifts away and the new one settles in (see .page in globals.css).
export default function SiteTemplate({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page" exit="page" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
