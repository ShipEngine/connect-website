import {
  EnhancedGroup,
  EnhancedItem,
  EnhancedMenu,
  EnhancedSubGroup,
  MenuContents,
  MenuContext,
  MenuItem,
} from './menu-types'

/**
 * This function does the following:
 *
 *    - Assigns a unique, consistent ID to each MenuItem
 *    - Selects the current MenuItem for the current page
 *    - Expands the parent Group and SubGroup of the selected MenuItem
 *
 * @param menu - The menu contents
 * @param pathname - The path of the current page
 * @param context - The Menu context, including the currently-selected MenuItem
 * @returns A new array of MenuGroups IDs for each MenuItem, and one MenuItem selected
 */
export function enhanceMenu(menu: MenuContents, pathname: string, context: MenuContext): EnhancedMenu {
  const enhancedMenu: EnhancedMenu = []
  let id = 0,
    hasSelectedAMenuItem = false

  for (const group of menu) {
    const enhancedGroup: EnhancedGroup = {
      open: false,
      ...group,
      subGroups: [],
      menuItems: [],
    }

    for (const subGroup of group.subGroups || []) {
      const enhancedSubGroup: EnhancedSubGroup = {
        ...subGroup,
        selected: false,
        menuItems: [],
      }

      for (const menuItem of subGroup.menuItems) {
        const enhancedItem = doMenuItem(menuItem)

        // If the MenuItem is selected, then also select/open its parents
        enhancedGroup.open = enhancedGroup.open || enhancedItem.selected
        enhancedSubGroup.selected = enhancedSubGroup.selected || enhancedItem.selected

        enhancedSubGroup.menuItems.push(enhancedItem)
      }

      enhancedGroup.subGroups.push(enhancedSubGroup)
    }

    for (const menuItem of group.menuItems || []) {
      // Assign a unique ID to this MenuItem, and determine whether it is selected
      const menuProps = doMenuItem(menuItem)

      // If the MenuItem is selected, then also open its parent Group
      enhancedGroup.open = enhancedGroup.open || menuProps.selected

      enhancedGroup.menuItems.push(menuProps)
    }

    enhancedGroup.open = context.openedGroups[group.title] = context.openedGroups[group.title] || enhancedGroup.open
    enhancedMenu.push(enhancedGroup)
  }

  /**
   * Adds a unique ID and sets whether the MenuItem is selected or not
   */
  function doMenuItem(menuItem: MenuItem): EnhancedItem {
    id++
    const selected = !hasSelectedAMenuItem && isSelected(id, menuItem.href, pathname, context)

    // Once we've selected a MenuItem, we don't want select any others
    hasSelectedAMenuItem = hasSelectedAMenuItem || selected

    // Assign a unique ID to this MenuItem, and determine whether it is selected
    return { ...menuItem, id, selected }
  }

  return enhancedMenu
}

/**
 * Determines whether a MenuItem should be selected or not.
 *
 * @param id - The `id` of the current MenuItem
 * @param href - The `href` of the current MenuItem. This is the page that the MenuItem links to.
 * @param pathname - The path of the current page
 * @param context - The Menu context, including the currently-selected MenuItem
 */
function isSelected(id: number, href: string, pathname: string, context: MenuContext): boolean {
  if (href !== pathname) {
    // This menu item does not link to the current page, so DON'T select it
    return false
  }

  if (context.selectedMenuItem.href === href) {
    // Multiple MenuItems can link to the same page,
    // so only selecct the one that matches the selected ID
    return id === context.selectedMenuItem.id
  } else {
    // The currently-selected MenuItem points to the wrong page.
    // This happens when the user uses their browser's Back/Forward navigation.
    // So select this MenuItem instead, since it points to the current page.
    return true
  }
}
