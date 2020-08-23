import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { enhanceMenu } from "./enhance-menu";
import { EnhancedGroup, EnhancedItem, EnhancedSubGroup, MenuContents } from "./menu-types";
import styles from "./menu.module.scss";

export const MenuContext = React.createContext({
  selectedMenuItem: { id: 0, href: "" },
  openedGroups: {},
});

export interface MenuProps {
  contents: MenuContents;
}

export default function Menu({ contents }: MenuProps) {
  const [visible, setVisible] = useState(false);
  const context = useContext(MenuContext);
  const { pathname } = useRouter();

  // Assign a unique ID to each MenuItem and expand/select Groups/SubGroups
  const menu = enhanceMenu(contents, pathname, context);

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
  const context = useContext(MenuContext);

  return (
    <li key={title}>
      <details className={styles.group} open={open}
        onToggle={e => context.openedGroups[title] = (e.target as HTMLDetailsElement).open}>
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
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
        <a className={`${styles.menuItem} ${selected ? styles.selected : ""}`}
          onClick={() => context.selectedMenuItem = { id, href }}>
          { title }
        </a>
      </Link>
    </li>
  );
}
