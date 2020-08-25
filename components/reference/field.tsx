import { Children } from "../../lib/react-nodes";

export interface FieldProps {
  name: string;
  required?: boolean;
  nullable?: boolean;
  type?: string | Children;
  defaultValue?: string | Children;
  description?: string | Children;
  children?: Children;
}

/**
 * Reference information for a single field, such as its name, data type, default value, etc.
 *
 * NOTE: The `type`, `default`, and `description` props can be strings or JSX children.
 * JSX child components allow you to use Markdown, wheras string props are plain-text.
 */
export function Field(field: FieldProps) {
  return (
    <tr key={field.name}>
      { field.name && <td><code>{ field.name }</code></td> }
      { field.type && <td>{ field.type }</td> }
      { field.required !== undefined && <td className="centered">{ field.required ? "✔" : "" }</td> }
      { field.nullable !== undefined && <td className="centered">{ field.required ? "✔" : "" }</td> }
      { field.defaultValue && <td>{ field.defaultValue }</td> }
      { field.description && <td>{ field.description }</td> }
    </tr>
  );
}


export function Type({ children }: { children: Children }) {
  return <>{ children }</>;
}

export function DefaultValue({ children }: { children: Children }) {
  return <>{ children }</>;
}

export function Description({ children }: { children: Children }) {
  return <>{ children }</>;
}
