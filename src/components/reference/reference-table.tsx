import { FieldProps } from "./reference";
import styles from "./reference-table.module.scss";
import { ToggleLayout } from "./toggle-layout";


interface ReferenceTableProps {
  nameHeading?: string;
  fields: FieldProps[];
}


/**
 * Renders a table of reference information. Each row in the table is a `<Field>`
 * component, which defines the field name, data type, default value, description, etc.
 */
export function ReferenceTable({ nameHeading, fields }: ReferenceTableProps) {
  // Determine which columns to show
  const firstField = fields[0] || {} as FieldProps;
  const hasName = Boolean(firstField.name);
  const hasType = Boolean(firstField.type);
  const hasDefault = Boolean(firstField.defaultValue);
  const hasRequired = Boolean(firstField.required !== undefined);
  const hasNullable = Boolean(firstField.nullable !== undefined);
  const hasDescription = Boolean(firstField.description);

  return (
    <div className={styles.referenceTableWrapper}>
      <ToggleLayout className={styles.toggleLayout} />
      <table>
        <thead>
          <tr>
            {hasName && <th>{nameHeading || "Name"}</th>}
            {hasType && <th>Type</th>}
            {hasRequired && <th>Required?</th>}
            {hasNullable && <th>Nullable?</th>}
            {hasDefault && <th>Default</th>}
            {hasDescription && <th>Description</th>}
          </tr>
        </thead>
        <tbody>
          {fields.map(ReferenceTableRow)}
        </tbody>
      </table>
    </div>
  );
}


function ReferenceTableRow(field: FieldProps) {
  return (
    <tr key={field.name}>
      {field.name && <td><code>{field.name}</code></td>}
      {field.type && <td>{field.type}</td>}
      {field.required !== undefined && <td className="centered">{field.required ? "✔" : ""}</td>}
      {field.nullable !== undefined && <td className="centered">{field.nullable ? "✔" : ""}</td>}
      {field.defaultValue && <td>{field.defaultValue}</td>}
      {field.description && <td>{field.description}</td>}
    </tr>
  );
}
