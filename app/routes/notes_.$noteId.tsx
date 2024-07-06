import { json, Link, useLoaderData } from "@remix-run/react";
import detailsStyles from "../styles/note-details.css?url";
import {
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { getStoredNotes } from "../data/notes";

const NoteDetailsPage = () => {
  const note = useLoaderData<typeof loader>();
  return (
    <main id="note-details">
      <header>
        <nav>
          <Link to={"/notes"}>Back to all notes</Link>
        </nav>
        <h1>{note.title}</h1>
      </header>
      <p id="note-details-content">{note.content}</p>
    </main>
  );
};

export default NoteDetailsPage;

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const notes = await getStoredNotes();
  const noteId = params.noteId;
  const selectedNote = notes.find((note) => note.id === noteId);

  if (!selectedNote) {
    throw json({ message: "Could not find note for id" }, { status: 404 });
  }

  return selectedNote;
};

export const meta: MetaFunction<typeof loader> = ({ data }) => [
  {
    title: data.title,
  },
  {
    name: "description",
    content: "Manage your notes",
  },
];

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: detailsStyles },
];
