import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { EnhancedGroup, EnhancedItem, EnhancedSubGroup, MenuContents } from "./menu-types";
import styles from "./menu.module.scss";
import { selectCurrentPage } from "./select-current-page";

export const MenuContext = React.createContext({
  selectedMenuItem: { id: 0, href: "" }
});

export interface MenuProps {
  contents: MenuContents;
}

export default function Menu({ contents }: MenuProps) {
  const [visible, setVisible] = useState(false);
  const context = useContext(MenuContext);
  const { pathname } = useRouter();

  // Assign a unique ID to each MenuItem and expand/select Groups/SubGroups
  const menu = selectCurrentPage(contents, pathname, context);

  return (
    <nav className={styles.menu}>
      <button id="menu-button" className={styles.menuButton}
        onClick={() => setVisible(!visible)}></button>
      <ul className={`${styles.menuList} nav-menu ${visible ? "visible" : ""}`}>
        { menu.map(Group) }
      </ul>
    </nav>
  );
}

function Group({ title, open, subGroups, menuItems }: EnhancedGroup) {
  return (
    <li key={title}>
      <details className={styles.group} open={open}>
        <summary>{ title }</summary>
        <ul className={styles.groupList}>
          { subGroups.map(SubGroup) }
          { menuItems.map(MenuItem) }
        </ul>
      </details>
    </li>
  );
}

function SubGroup({ title, selected, menuItems }: EnhancedSubGroup) {
  return (
    <li key={title}>
      <div className={`${styles.subGroup} ${selected ? styles.selected : ""}`}>
        { title }
      </div>
      <ul className={styles.subGroupList}>
        { menuItems.map(MenuItem) }
      </ul>
    </li>
  );
}

function MenuItem({ id, title, href, selected }: EnhancedItem) {
  const context = useContext(MenuContext);

  return (
    <li key={id}>
      <Link href={href}>
        <a className={`${styles.menuItem} ${selected ? styles.selected : ""}`}
          onClick={() => context.selectedMenuItem = { id, href }}>
          { title }
        </a>
      </Link>
    </li>
  );
}
