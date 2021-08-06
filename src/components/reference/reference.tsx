import React, { useContext } from "react";
import { Children, Props } from "../../lib/react-nodes";
import { UserSettingsContext } from "../user-settings/user-settings-context";
import { normalizeChildren } from "./normalize-children";
import { ReferenceList } from "./reference-list";
import { ReferenceTable } from "./reference-table";


export type ReferenceLayout = "table" | "list";


export interface ReferenceProps {
  nameHeading?: string;
  children: Children<FieldProps>;
}


/**
 * Renders a table of reference information. Each row in the table is a `<Field>`
 * component, which defines the field name, data type, default value, description, etc.
 */
export function Reference({ nameHeading, children }: ReferenceProps) {
  const userSettings = useContext(UserSettingsContext);
  const fields = normalizeChildren(children);

  if (userSettings.referenceLayout === "list") {
    return <ReferenceList nameHeading={nameHeading} fields={fields} />;
  }
  else {
    return <ReferenceTable nameHeading={nameHeading} fields={fields} />;
  }
}


/**
 * Reference information for a single field, such as its name, data type, default value, etc.
 *
 * NOTE: The `type`, `default`, and `description` props can be strings or JSX children.
 * JSX child components allow you to use Markdown, wheras string props are plain-text.
 */
export interface FieldProps {
  name: string;
  required?: boolean;
  nullable?: boolean;
  type?: string | Children;
  defaultValue?: string | Children;
  description?: string | Children;
  children?: Children;
}


// NOTE: This component never gets rendered. It alwasy gets replaced with either a
// <ReferenceTableRow> or a <ReferenceListItem>
export const Field: React.FC<FieldProps> = () => null;

// NOTE: These are just pass-through components
export const Type: React.FC<Props> = ({ children }: Props) => <>{children}</>;
export const DefaultValue: React.FC<Props> = ({ children }: Props) => <>{children}</>;
export const Description: React.FC<Props> = ({ children }: Props) => <>{children}</>;
