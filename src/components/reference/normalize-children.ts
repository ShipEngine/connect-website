import { Children, getElements, getTypeName } from '../../lib/react-nodes'
import { FieldProps } from './reference'

/**
 * The `type`, `defaultValue`, and `description` can be specified as string props
 * or as JSX child components. This function normalizes them as props.
 */
export function normalizeChildren(children: Children<FieldProps>): FieldProps[] {
  const fields: FieldProps[] = []

  // Move <Type>, <DefaultValue>, and <Description> from children to props
  for (const field of getElements(children)) {
    const props = { ...field.props }
    fields.push(props)

    for (const child of getElements(field.props.children)) {
      const type = getTypeName(child)
      switch (type) {
        case 'Type':
          props.type = child
          break

        case 'DefaultValue':
          props.defaultValue = child
          break

        case 'Description':
          props.description = child
          break
      }
    }
  }

  // Determine which props are set on ANY of the fields
  const hasName = fields.some((field) => field.name)
  const hasType = fields.some((field) => field.type)
  const hasDefault = fields.some((field) => field.defaultValue)
  const hasRequired = fields.some((field) => field.required !== undefined)
  const hasNullable = fields.some((field) => field.nullable !== undefined)
  const hasDescription = fields.some((field) => field.description)

  // Ensure that every field has the same props
  for (const field of fields) {
    hasName && field.name === undefined && (field.name = '')
    hasType && field.type === undefined && (field.type = '')
    hasDefault && field.defaultValue === undefined && (field.defaultValue = '')
    hasRequired && field.required === undefined && (field.required = false)
    hasNullable && field.nullable === undefined && (field.nullable = false)
    hasDescription && field.description === undefined && (field.description = '')
  }

  return fields
}
