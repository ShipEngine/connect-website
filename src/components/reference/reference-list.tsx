import { H3 } from "../html/headings";
import { FieldProps } from "./reference";
import styles from "./reference-list.module.scss";
import { ToggleLayout } from "./toggle-layout";


interface ReferenceTableProps {
  nameHeading?: string;
  fields: FieldProps[];
}


/**
 * Renders a list of reference information. Each item in the list is a `<Field>`
 * component, which defines the field name, data type, default value, description, etc.
 */
export function ReferenceList({ fields }: ReferenceTableProps) {
  return (
    <div className={styles.referenceListWrapper}>
      <ToggleLayout className={styles.toggleLayout} />
      <div className={styles.referenceList}>
        {
          fields.map(field =>
            <ReferenceListItem key={field.name} {...field} />
          )
        }
      </div>
    </div>
  )
}

function humanizeType(field: FieldProps): string {
  const isSimpleType = typeof field.type === "string";
  const definition = [];

  if (field.required) {
    definition.push("required");
  }

  if (field.nullable) {
    definition.push("nullable");
  }

  if(isSimpleType) {
    definition.push(field.type);
  }

  if(definition.length === 0) {
    return "";
  } else {
    return "(" + definition.join(" ") + ")";
  }
}

function ReferenceListItem(field: FieldProps) {
  const isSimpleType = typeof field.type === "string";

  return <>
    <H3>
      <code class="fieldName">{field.name}</code>
      {` `}
      <small className={styles.small}>
        {humanizeType(field)}
      </small>
    </H3>
    <div className={styles.listItemBody}>
      {
        !isSimpleType &&
        <div>
          <strong className={styles.label}>Type:</strong>
          {field.type}
        </div>
      }
      {
        field.defaultValue &&
        <div>
          <strong className={styles.label}>Default:</strong>
          {field.defaultValue}
        </div>
      }
      {
        field.description &&
        <div>
          {field.description}
        </div>
      }
    </div>
  </>;
}
