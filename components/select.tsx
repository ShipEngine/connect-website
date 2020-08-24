import { ChangeEvent, ChangeEventHandler, FocusEvent, OptionHTMLAttributes, ReactElement, SelectHTMLAttributes, SyntheticEvent, useState } from "react";
import { toArray } from "../lib/react-nodes";
import styles from "./select.module.scss";


/**
 * An enhanced select list that can be styled more extensively
 */
export function Select({ children, className, value, onChange, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  const [open, setOpen] = useState(false);
  const options = toArray(children) as ReactElement<OptionProps>[];
  className = className || "";

  // Toggles the open/closed state
  const toggleOpen = () => setOpen(!open);

  // Closes the dropdown, unless the target is one of the options
  const close = (e: FocusEvent) => setOpen((e.relatedTarget as Element)?.matches(`.${styles.option}`));

  return (
    <span className={`select ${className} ${styles.select} `} role="listbox" tabIndex={0}
      onClick={toggleOpen} onKeyPress={toggleOpen} onBlur={close} {...props as unknown}>

      <span className={`select-label ${styles.selectLabel}`}>{value}</span>

      <span className={`select-options ${styles.selectOptions} ${open ? styles.open : ""}`}>
        {
          options.map(option => ({
            ...option,
            props: {
              ...option.props,
              selected: option.props.value === value,
              changeSelectedValue: onChange,
            }
          }))
        }
      </span>
    </span>
  );
}

export interface OptionProps extends OptionHTMLAttributes<HTMLOptionElement> {
  changeSelectedValue?(event: ChangeEvent<HTMLSelectElement>): void;
}

/**
 * An enhanced option element that can be styled more extensively
 */
export function Option({ label, value, className, children, selected, changeSelectedValue }: OptionProps) {
  className = className || "";

  // Selects this option
  const selectOption = (e: SyntheticEvent) => propagateChange(e, value, changeSelectedValue);

  return (
    <div className={`${className} ${styles.option}`} role="option" aria-selected={selected} tabIndex={0}
      onClick={selectOption} onKeyPress={selectOption} data-value={value}>
      { label || children }
    </div>
  );
}


/**
 * Calls the `onChange` event handler with a synthetic ChangeEventHandler event
 */
function propagateChange(event: SyntheticEvent, value: unknown, onChange?: ChangeEventHandler<HTMLSelectElement>) {
  if (!onChange) return;

  const target = { ...event.target, value } as EventTarget & HTMLSelectElement;
  const changeEvent = { ...event, target } as unknown as ChangeEvent<HTMLSelectElement>;
  onChange(changeEvent);
}
