import navigationData from '../data/navigation.json';

export interface NavigationItem {
  label: string;
  slug: string;
  type: 'section' | 'page';
}

export interface NavigationSection {
  title: string;
  items: NavigationItem[];
}

export interface NavigationData {
  sections: NavigationSection[];
}

// Get all navigation items in order (flattened)
export function getAllNavigationItems(): NavigationItem[] {
  const items: NavigationItem[] = [];
  navigationData.sections.forEach(section => {
    items.push(...section.items as NavigationItem[]);
  });
  return items;
}

// Get navigation items for a specific section
export function getSectionItems(sectionTitle: string): NavigationItem[] {
  const section = navigationData.sections.find(s => s.title === sectionTitle);
  return section ? (section.items as NavigationItem[]) : [];
}

// Get previous and next navigation items for a given slug
export function getNavigationItems(currentSlug: string): { previous?: NavigationItem; next?: NavigationItem } {
  const allItems = getAllNavigationItems();
  const currentIndex = allItems.findIndex(item => item.slug === currentSlug);
  
  if (currentIndex === -1) {
    return {};
  }
  
  const previous = currentIndex > 0 ? allItems[currentIndex - 1] : undefined;
  const next = currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : undefined;
  
  return { previous, next };
}

// Get all section titles
export function getSectionTitles(): string[] {
  return navigationData.sections.map(section => section.title);
}

// Add a new page to a specific section
export function addPageToSection(sectionTitle: string, newPage: NavigationItem): NavigationData {
  const updatedData = JSON.parse(JSON.stringify(navigationData)) as NavigationData;
  const section = updatedData.sections.find(s => s.title === sectionTitle);
  
  if (section) {
    section.items.push(newPage);
  }
  
  return updatedData;
}

// Remove a page from navigation
export function removePageFromNavigation(slug: string): NavigationData {
  const updatedData = JSON.parse(JSON.stringify(navigationData)) as NavigationData;
  
  updatedData.sections.forEach(section => {
    section.items = section.items.filter(item => item.slug !== slug);
  });
  
  // Remove empty sections
  updatedData.sections = updatedData.sections.filter(section => section.items.length > 0);
  
  return updatedData;
}

// Update navigation data (for saving changes)
export function updateNavigationData(newData: NavigationData): void {
  // This would be used when saving navigation changes
  // For now, we'll just return the data structure
  console.log('Navigation data updated:', newData);
}

// Get the full navigation data
export function getNavigationData(): NavigationData {
  return navigationData as NavigationData;
}
