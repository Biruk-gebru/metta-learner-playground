import React from "react";
import { TOCHeading } from "./TableOfContents";

// Utility to slugify heading text for IDs
const slugify = (text: string): string =>
  text
    .toLowerCase()
    .replace(/[^ -\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with dashes
    .replace(/-+/g, "-") // Remove duplicate dashes
    .replace(/^-|-$/g, ""); // Trim leading/trailing dashes

export function extractHeadingsFromChildren(children: React.ReactNode): TOCHeading[] {
  const headings: TOCHeading[] = [];

  function walk(node: React.ReactNode) {
    if (!node) return;
    if (Array.isArray(node)) {
      node.forEach(walk);
      return;
    }
    if (React.isValidElement(node)) {
      const type = node.type as any;
      if (typeof type === "string" && /^h[1-3]$/.test(type)) {
        const props = node.props as any;
        const title = typeof props.children === "string"
          ? props.children
          : Array.isArray(props.children)
            ? props.children.join("")
            : "";
        const id = props.id || slugify(title);
        const level = parseInt(type[1], 10);
        headings.push({ id, title, level });
      }
      // Recurse into children
      const props = node.props as any;
      if (props && props.children) {
        walk(props.children);
      }
    }
  }

  walk(children);
  return headings;
} 