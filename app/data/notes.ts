import fs from "fs/promises";

export async function getStoredNotes(): Promise<Notes["notes"]> {
  const rawFileContent = await fs.readFile("notes.json", { encoding: "utf-8" });
  const data: Notes = JSON.parse(rawFileContent);
  const storedNotes = data.notes ?? [];
  return storedNotes;
}

export function storeNotes(notes: Notes["notes"]) {
  return fs.writeFile("notes.json", JSON.stringify({ notes: notes || [] }));
}

export type Notes = {
  notes: {
    id: string;
    title: string;
    content: string;
  }[];
};

export type Note = Notes["notes"][number];
