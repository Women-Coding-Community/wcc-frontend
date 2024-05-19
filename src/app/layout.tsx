import * as React from "react";

import { ClientThemeProvider } from "@components";

export const metadata = {
  title: "Women Coding Community",
  description: "Women Coding Community",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientThemeProvider>{children}</ClientThemeProvider>
      </body>
    </html>
  );
}
