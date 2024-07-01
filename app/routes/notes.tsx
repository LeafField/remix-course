import { ActionFunction, LinksFunction, LoaderFunction } from "@remix-run/node";
import NewNote, { links as newNoteLinks } from "../components/NewNote";
import { getStoredNotes } from "../data/notes";

const NotePage = () => {
  return (
    <main>
      <NewNote />
    </main>
  );
};

export default NotePage;

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const noteData = Object.fromEntries(formData.entries());
  const existingNote = await getStoredNotes();
  noteData.id = new Date().toISOString();
};

export const links: LinksFunction = () => [...newNoteLinks()];
