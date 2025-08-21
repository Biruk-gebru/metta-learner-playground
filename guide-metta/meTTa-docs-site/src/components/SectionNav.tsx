import React from "react";
import Link from "next/link";
import { getNavigationItems as getNavItems, NavigationItem } from "../utils/navigation";

interface SectionNavProps {
  previous?: NavigationItem;
  next?: NavigationItem;
}

// Utility function to get previous and next navigation items
export const getNavigationItems = (currentSlug: string): { previous?: NavigationItem; next?: NavigationItem } => {
  return getNavItems(currentSlug);
};

const SectionNav = ({ previous, next }: SectionNavProps) => (
  <div className="flex justify-between mt-8 gap-4">
    {previous ? (
      <Link
        href={`/${previous.slug}`}
        className="px-4 py-2 rounded-md border font-medium text-sm transition bg-metta-accent text-white border-metta-accent hover:bg-metta-accent/80"
      >
        ← {previous.label}
      </Link>
    ) : <div />}
    {next ? (
      <Link
        href={`/${next.slug}`}
        className="px-4 py-2 rounded-md border font-medium text-sm transition bg-metta-accent text-white border-metta-accent hover:bg-metta-accent/80"
      >
        {next.label} →
      </Link>
    ) : <div />}
  </div>
);

export default SectionNav; 