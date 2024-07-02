import { ActionFunction, LinksFunction, redirect } from "@remix-run/node";
import NewNote, { links as newNoteLinks } from "../components/NewNote";
import NoteList, { links as noteListLinks } from "../components/NoteList";
import { getStoredNotes, storeNotes } from "../data/notes";
import type { Note } from "../data/notes";
import { useLoaderData } from "@remix-run/react";

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
