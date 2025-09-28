import { requiredGroups, menu } from '../config';

// User context interface - should match what Captify platform provides
export interface UserContext {
  groups: string[];
  userId: string;
  email?: string;
}

// Permission check utilities
export class PermissionChecker {
  private userContext: UserContext | null = null;

  constructor(userContext?: UserContext) {
    this.userContext = userContext || null;
  }

  // Set user context (called by platform on auth)
  setUserContext(userContext: UserContext) {
    this.userContext = userContext;
  }

  // Check if user has access to the app
  canAccessApp(): boolean {
    if (!this.userContext || !requiredGroups) return false;

    return requiredGroups.some(group =>
      this.userContext!.groups.includes(group)
    );
  }

  // Check if user can access a specific menu item
  canAccessMenuItem(menuId: string): boolean {
    if (!this.userContext) return false;

    // Find the menu item by ID
    const menuItem = this.findMenuItemById(menuId);
    if (!menuItem) return false;

    // If no specific permissions for this menu item, check app-level access
    if (!menuItem.requiredGroups) {
      return this.canAccessApp();
    }

    return menuItem.requiredGroups.some((group: string) =>
      this.userContext!.groups.includes(group)
    );
  }

  // Helper to find menu item by ID
  private findMenuItemById(menuId: string): any {
    for (const menuGroup of menu) {
      if (menuGroup.children) {
        const found = menuGroup.children.find((item: any) => item.id === menuId);
        if (found) return found;
      }
    }
    return null;
  }

  // Get filtered menu based on permissions
  getFilteredMenu(menu: any[]): any[] {
    if (!this.userContext) return [];

    return menu
      .map(menuGroup => ({
        ...menuGroup,
        children: menuGroup.children?.filter((item: any) =>
          this.canAccessMenuItem(item.id)
        ) || []
      }))
      .filter(menuGroup =>
        menuGroup.children && menuGroup.children.length > 0
      );
  }

  // Check if user is in a specific group
  isInGroup(groupName: string): boolean {
    return this.userContext?.groups.includes(groupName) || false;
  }

  // Get user's groups
  getUserGroups(): string[] {
    return this.userContext?.groups || [];
  }
}

// Singleton instance for use across the app
export const permissionChecker = new PermissionChecker();

// React hook for permission checking
export function usePermissions() {
  return {
    canAccessApp: () => permissionChecker.canAccessApp(),
    canAccessMenuItem: (menuId: string) => permissionChecker.canAccessMenuItem(menuId),
    isInGroup: (groupName: string) => permissionChecker.isInGroup(groupName),
    getUserGroups: () => permissionChecker.getUserGroups(),
    getFilteredMenu: (menu: any[]) => permissionChecker.getFilteredMenu(menu)
  };
}