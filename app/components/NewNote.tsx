import { Form, useActionData, useNavigation } from "@remix-run/react";
import styles from "./NewNote.css?url";
import { LinksFunction } from "@remix-run/node";

export default function NewNote() {
  const data = useActionData<{ message: string | undefined }>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Form method="post" id="note-form">
      {data?.message && <p>{data.message}</p>}
      <p>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required />
      </p>
      <p>
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" rows={5} required />
      </p>
      <div className="form-actions">
        <button disabled={isSubmitting}>
          {isSubmitting ? "Addiing..." : "Add Note"}
        </button>
      </div>
    </Form>
  );
}

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];
