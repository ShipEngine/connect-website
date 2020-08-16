import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useState } from "react";
import { getElements } from "../../../lib/utils";
import styles from "./menu.module.scss";

export interface MenuProps {
  children?: ReactNode;
}

export default function Menu({ children }: MenuProps) {
  const [visible, setVisible] = useState(false);

  return (
    <nav className={styles.menu}>
      <button id="menu-button" className={styles.menuButton}
        onClick={() => setVisible(!visible)}></button>
      <ul className={`${styles.menuList} nav-menu ${visible ? "visible" : ""}`}>
        { children }
      </ul>
    </nav>
  );
}

export interface GroupProps {
  title: string;
  open?: boolean;
  children?: ReactNode;
}

export function Group({ title, open, children }: GroupProps) {
  const { pathname } = useRouter();

  if (!open) {
    // Automatically expand the group if any of its menu items link to the current page
    for (const subGroup of getElements<SubGroupProps>(children)) {
      const menuItems = getElements<MenuItemProps>(subGroup.props.children);
      if (menuItems.some(item => item.props.href === pathname)) {
        open = true;
        break;
      }
    }
  }

  return (
    <li>
      <details className={styles.group} open={open}>
        <summary>{ title }</summary>
        <ul className={styles.groupList}>
          { children }
        </ul>
      </details>
    </li>
  );
}

export interface SubGroupProps {
  title: string;
  children?: ReactNode;
}

export function SubGroup({ title, children }: SubGroupProps) {
  // Determine if any of the menu items link to the current page
  const { pathname } = useRouter();
  const menuItems = getElements<MenuItemProps>(children);
  const selected = menuItems.some(item => item.props.href === pathname);

  return (
    <li>
      <div className={`${styles.subGroup} ${selected ? styles.selected : ""}`}>
        { title }
      </div>
      <ul className={styles.subGroupList}>
        { children }
      </ul>
    </li>
  );
}

export interface MenuItemProps {
  href: string;
  children?: ReactNode;
}

export function MenuItem({ href, children }: MenuItemProps) {
  // Determine if the href links to the current page
  const { pathname } = useRouter();
  const selected = href === pathname;

  return (
    <li>
      <Link href={href}>
        <a className={`${styles.menuItem} ${selected ? styles.selected : ""}`}>{ children }</a>
      </Link>
    </li>
  );
}
