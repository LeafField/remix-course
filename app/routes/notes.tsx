import {
  ActionFunction,
  LinksFunction,
  MetaFunction,
  redirect,
} from "@remix-run/node";
import NewNote, { links as newNoteLinks } from "../components/NewNote";
import NoteList, { links as noteListLinks } from "../components/NoteList";
import { getStoredNotes, storeNotes } from "../data/notes";
import type { Note } from "../data/notes";
import {
  isRouteErrorResponse,
  json,
  Link,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";

export default function NotePage() {
  const notes = useLoaderData<typeof loader>();

  return (
    <main>
      <NewNote />
      {notes && <NoteList notes={notes} />}
    </main>
  );
}

export async function loader() {
  const notes = await getStoredNotes();
  if (!notes || notes.length === 0) {
    throw json(
      { message: "Could not find any notes." },
      {
        status: 404,
        statusText: "Not found",
      }
    );
  }

  return json(notes);
}

export async function action({ request }) {
  const formData = await request.formData();
  const noteData = Object.fromEntries(formData.entries());

  if ((noteData.title as string).trim().length < 5) {
    return { message: "Invalid title - must be at least 5 charactors long ." };
  }

  noteData.id = new Date().toISOString();
  const existingNote = await getStoredNotes();
  const updateNotes = existingNote.concat(noteData as Note);
  await storeNotes(updateNotes);
  return redirect("/notes");
}

export const links: LinksFunction = () => [
  ...newNoteLinks(),
  ...noteListLinks(),
];

export const meta: MetaFunction = () => [
  {
    title: "All notes",
  },
  {
    name: "description",
    content: "Manage your notes",
  },
];

export function ErrorBoundry() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <main className="error">
        <h1>An error occurred!</h1>
        <p>{error.statusText}</p>
        <p>
          Back to <Link to={"/"}>sefety</Link>
        </p>
      </main>
    );
  } else if (error instanceof Error) {
    return (
      <main className="error">
        <h1>An error occurred!</h1>
        <p>{error.message}</p>
        <p>aaaa</p>
        <p>
          Back to <Link to={"/"}>sefety</Link>
        </p>
      </main>
    );
  }
}
