import { Children, getElements, getTypeName } from "../lib/react-nodes";

interface ReferenceProps {
  nameHeading?: string;
  children: Children<FieldProps>;
}

interface FieldProps {
  name: string;
  required?: boolean;
  nullable?: boolean;
  type?: string | Children;
  defaultValue?: string | Children;
  description?: string | Children;
  children?: Children;
}


/**
 * Renders a table of reference information. Each row in the table is a `<Field>`
 * component, which defines the field name, data type, default value, description, etc.
 */
export function Reference({ nameHeading, children }: ReferenceProps) {
  const fields = normalizeChildren(children);

  // Determine which columns to show
  const firstField = fields[0] || {} as FieldProps;
  const hasName = Boolean(firstField.name);
  const hasType = Boolean(firstField.type);
  const hasDefault = Boolean(firstField.defaultValue);
  const hasRequired = Boolean(firstField.required !== undefined);
  const hasNullable = Boolean(firstField.nullable !== undefined);
  const hasDescription = Boolean(firstField.description);

  return (
    <table>
      <thead>
        <tr>
          { hasName && <th>{nameHeading || "Name"}</th> }
          { hasType && <th>Type</th> }
          { hasRequired && <th>Required?</th> }
          { hasNullable && <th>Nullable?</th> }
          { hasDefault && <th>Default</th> }
          { hasDescription && <th>Description</th> }
        </tr>
      </thead>
      <tbody>
        { fields.map(Field) }
      </tbody>
    </table>
  );
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


/**
 * The `type`, `defaultValue`, and `description` can be specified as string props
 * or as JSX child components. This function normalizes them as props.
 */
function normalizeChildren(children: Children<FieldProps>): FieldProps[] {
  const fields: FieldProps[] = [];

  // Move <Type>, <DefaultValue>, and <Description> from children to props
  for (const field of getElements(children)) {
    const props = { ...field.props };
    fields.push(props);

    for (const child of getElements(field.props.children)) {
      const type = getTypeName(child);
      switch (type) {
        case "Type":
          props.type = child;
          break;

        case "DefaultValue":
          props.defaultValue = child;
          break;

        case "Description":
          props.description = child;
          break;
      }
    }
  }

  // Determine which props are set on ANY of the fields
  const hasName = fields.some(field => field.name);
  const hasType = fields.some(field => field.type);
  const hasDefault = fields.some(field => field.defaultValue);
  const hasRequired = fields.some(field => field.required !== undefined);
  const hasNullable = fields.some(field => field.nullable !== undefined);
  const hasDescription = fields.some(field => field.description);

  // Ensure that every field has the same props
  for (const field of fields) {
    hasName && field.name === undefined && (field.name = "");
    hasType && field.type === undefined && (field.type = "");
    hasDefault && field.defaultValue === undefined && (field.defaultValue = "");
    hasRequired && field.required === undefined && (field.required = false);
    hasNullable && field.nullable === undefined && (field.nullable = false);
    hasDescription && field.description === undefined && (field.description = "");
  }

  return fields;
}
