import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";
import { LinksFunction } from "@remix-run/node";
import styles from "~/styles/main.css?url";
import MainNavigation from "./components/MainNavigation";
import { ErrorBoundaryComponent } from "@remix-run/react/dist/routeModules";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  const error = useRouteError();
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <title>An Error</title>
      </head>
      <body>
        {/* <header>
          <MainNavigation />
        </header> */}
        <main className="error">
          <h1>An error occurred!</h1>
          <p>{(error as any).message}</p>
          <p>
            Back to <Link to={"/"}>sefety</Link>
          </p>
        </main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];
