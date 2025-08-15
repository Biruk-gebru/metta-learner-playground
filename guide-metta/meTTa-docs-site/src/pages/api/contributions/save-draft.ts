import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'src', 'data', 'contributions');
const draftsFile = path.join(dataDir, 'drafts.json');

function ensureDataFiles() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(draftsFile)) {
    fs.writeFileSync(draftsFile, JSON.stringify([]), 'utf-8');
  }
}

function readDrafts(): any[] {
  ensureDataFiles();
  const raw = fs.readFileSync(draftsFile, 'utf-8');
  try { return JSON.parse(raw); } catch { return []; }
}

function writeDrafts(drafts: any[]) {
  ensureDataFiles();
  fs.writeFileSync(draftsFile, JSON.stringify(drafts, null, 2), 'utf-8');
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const { title, category, content } = req.body || {};
  if (!title || !category || typeof content !== 'string') {
    return res.status(400).json({ error: 'Missing required fields: title, category, content' });
  }

  const drafts = readDrafts();
  const id = `d_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const draft = {
    id,
    title,
    category,
    content,
    status: 'draft',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  drafts.push(draft);
  writeDrafts(drafts);
  return res.status(200).json({ ok: true, id });
}
