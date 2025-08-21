import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

// Map slug to TSX file path within src/sections or pages
function resolveFilePathFromSlug(slug: string): string | null {
  const sectionsDir = path.join(process.cwd(), 'src', 'sections');
  const pagesDir = path.join(process.cwd(), 'src', 'pages');

  const map: Record<string, string> = {
    'functional-programming': path.join(sectionsDir, 'FunctionalProgrammingSection.tsx'),
    'what-is-metta': path.join(sectionsDir, 'WhatIsMettaSection.tsx'),
    'nondeterminism': path.join(sectionsDir, 'NonDeterminismSection.tsx'),
    'atomspace': path.join(sectionsDir, 'AtomspaceSection.tsx'),
    'standard-library': path.join(sectionsDir, 'StdLibHighlightsSection.tsx'),
    'recursion': path.join(sectionsDir, 'RecursionSection.tsx'),
    'best-practices': path.join(sectionsDir, 'BestPracticesSection.tsx'),
    'installation': path.join(sectionsDir, 'InstallationSection.tsx'),
    'projects/family-tree': path.join(sectionsDir, 'ProjectFamilyTreeSection.tsx'),
    'projects/python-integration': path.join(sectionsDir, 'ProjectNondeterministicMathSection.tsx'),
    'projects/neuro-symbolic': path.join(sectionsDir, 'ProjectNeuroSymbolicSection.tsx'),
    'projects/list-utils': path.join(sectionsDir, 'ProjectListUtilsSection.tsx'),
    // pages
    'glossary': path.join(pagesDir, 'glossary.tsx'),
    'references': path.join(pagesDir, 'references.tsx'),
  };

  return map[slug] || null;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).send('Method Not Allowed');
  }

  const slug = (req.query.slug as string) || '';
  if (!slug) {
    return res.status(400).json({ error: 'Missing slug' });
  }

  const filePath = resolveFilePathFromSlug(slug);
  if (!filePath) {
    return res.status(404).json({ error: `No file mapped for slug '${slug}'` });
  }

  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return res.status(200).json({ ok: true, slug, path: filePath, content });
  } catch (e: any) {
    return res.status(500).json({ error: e.message });
  }
}
