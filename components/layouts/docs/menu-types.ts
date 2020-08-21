export type MenuContents = MenuGroup[];

export interface MenuGroup {
  title: string;
  open?: boolean;
  subGroups?: MenuSubGroup[];
  menuItems?: MenuItem[];
}

export interface MenuSubGroup {
  title: string;
  menuItems: MenuItem[];
}

export interface MenuItem {
  title: string;
  href: string;
}

export type EnhancedMenu = EnhancedGroup[];

export interface EnhancedGroup extends MenuGroup {
  open: boolean;
  subGroups: EnhancedSubGroup[];
  menuItems: EnhancedItem[];
}

export interface EnhancedSubGroup extends MenuSubGroup {
  selected: boolean;
  menuItems: EnhancedItem[];
}

export interface EnhancedItem extends MenuItem {
  id: number;
  selected: boolean;
}

export interface MenuContext {
  selectedMenuItem: {
    id: number;
    href: string;
  }
}
