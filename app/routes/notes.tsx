import { ActionFunction, LinksFunction, redirect } from "@remix-run/node";
import NewNote, { links as newNoteLinks } from "../components/NewNote";
import NoteList, { links as noteListLinks } from "../components/NoteList";
import { getStoredNotes, storeNotes } from "../data/notes";
import type { Note } from "../data/notes";
import {
  Link,
  useActionData,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";

const NotePage = () => {
  const notes = useLoaderData<typeof loader>();

  return (
    <main>
      <NewNote />
      <NoteList notes={notes} />
    </main>
  );
};

export default NotePage;

export const loader = async () => {
  const notes = await getStoredNotes();
  return notes;
};

export const action: ActionFunction = async ({ request }) => {
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
};

export const links: LinksFunction = () => [
  ...newNoteLinks(),
  ...noteListLinks(),
];

export function ErrorBoundry() {
  const error = useRouteError();
  return (
    <main className="error">
      <h1>An error occurred!</h1>
      <p>{(error as any).message}</p>
      <p>
        Back to <Link to={"/"}>sefety</Link>
      </p>
    </main>
  );
}
