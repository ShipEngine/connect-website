import { Children } from "../../lib/react-nodes";
import { Field, FieldProps } from "./field";
import { normalizeChildren } from "./normalize-children";

interface ReferenceProps {
  nameHeading?: string;
  children: Children<FieldProps>;
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
