import {
  isRouteErrorResponse,
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
  if (isRouteErrorResponse(error)) {
    return (
      <main className="error">
        <h1>{error.statusText}</h1>
        <p>{error.data?.message || "Something went wrong!"}</p>
        <p>
          Back to <Link to="/">safety</Link>!
        </p>
      </main>
    );
  } else if (error instanceof Error) {
    return (
      <main className="error">
        <h1>An error occurred!</h1>
        <p>{error.message}</p>
        <p>
          Back to <Link to={"/"}>sefety</Link>
        </p>
      </main>
    );
  }
}

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];
