import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

export default async function RootLayout(props: { children: React.ReactNode }) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
      <AppRouterCacheProvider>
        {props.children}
      </AppRouterCacheProvider>
      </body>
    </html>
  );
}