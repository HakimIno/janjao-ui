import type { AccordionItemData } from './types';

/**
 * Finds all item IDs in a nested accordion data structure
 * @param data The accordion data structure
 * @returns Array of all item IDs
 */
export const getAllItemIds = (data: AccordionItemData[]): string[] => {
  const ids: string[] = [];

  const extractIds = (items: AccordionItemData[]) => {
    for (const item of items) {
      ids.push(item.id);
      if (item.children?.length) {
        extractIds(item.children);
      }
    }
  };

  extractIds(data);
  return ids;
};

/**
 * Finds IDs of all parent items (items with children)
 * @param data The accordion data structure
 * @returns Array of parent item IDs
 */
export const getParentItemIds = (data: AccordionItemData[]): string[] => {
  const ids: string[] = [];

  const extractParentIds = (items: AccordionItemData[]) => {
    for (const item of items) {
      if (item.children?.length) {
        ids.push(item.id);
        extractParentIds(item.children);
      }
    }
  };

  extractParentIds(data);
  return ids;
};

/**
 * Finds IDs of all leaf items (items without children)
 * @param data The accordion data structure
 * @returns Array of leaf item IDs
 */
export const getLeafItemIds = (data: AccordionItemData[]): string[] => {
  const ids: string[] = [];

  const extractLeafIds = (items: AccordionItemData[]) => {
    for (const item of items) {
      if (!item.children?.length) {
        ids.push(item.id);
      } else {
        extractLeafIds(item.children);
      }
    }
  };

  extractLeafIds(data);
  return ids;
};

/**
 * Finds an item by its ID in the accordion data structure
 * @param data The accordion data structure
 * @param id The ID to find
 * @returns The found item or undefined
 */
export const findItemById = (
  data: AccordionItemData[],
  id: string
): AccordionItemData | undefined => {
  for (const item of data) {
    if (item.id === id) {
      return item;
    }

    if (item.children?.length) {
      const foundInChildren = findItemById(item.children, id);
      if (foundInChildren) {
        return foundInChildren;
      }
    }
  }

  return undefined;
};

/**
 * Finds the parent ID of an item
 * @param data The accordion data structure
 * @param id The ID to find the parent for
 * @returns The parent ID or 'root' if the item is at the top level
 */
export const findParentId = (data: AccordionItemData[], id: string): string => {
  const findParent = (
    items: AccordionItemData[],
    targetId: string,
    parentId: string = 'root'
  ): string | null => {
    for (const item of items) {
      if (item.id === targetId) {
        return parentId;
      }

      if (item.children?.length) {
        const foundParent = findParent(item.children, targetId, item.id);
        if (foundParent) {
          return foundParent;
        }
      }
    }

    return null;
  };

  return findParent(data, id) || 'root';
};
