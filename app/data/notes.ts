import fs from "fs/promises";
import path from "node:path";

export async function getStoredNotes(): Promise<Notes["notes"]> {
  const rawFileContent = await fs.readFile(
    path.join(process.cwd(), "/app/data/notes.json"),
    { encoding: "utf-8" }
  );
  const data: Notes = JSON.parse(rawFileContent);
  const storedNotes = data.notes ?? [];
  return storedNotes;
}

/**
 * notes.jsonに新しいデータを書き込む関数です
 */
export function storeNotes(notes: Notes["notes"]) {
  return fs.writeFile(
    path.join(process.cwd(), "/app/data/notes.json"),
    JSON.stringify({ notes: notes || [] })
  );
}

export type Notes = {
  notes: {
    id: string;
    title: string;
    content: string;
  }[];
};

export type Note = Notes["notes"][number];
