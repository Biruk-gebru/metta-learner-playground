import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'src', 'data', 'contributions');
const draftsFile = path.join(dataDir, 'drafts.json');
const approvedFile = path.join(dataDir, 'approved.json');

function ensureDataFiles() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(draftsFile)) fs.writeFileSync(draftsFile, JSON.stringify([]), 'utf-8');
  if (!fs.existsSync(approvedFile)) fs.writeFileSync(approvedFile, JSON.stringify([]), 'utf-8');
}

function readJson(file: string): any[] {
  ensureDataFiles();
  const raw = fs.readFileSync(file, 'utf-8');
  try { return JSON.parse(raw); } catch { return []; }
}

function writeJson(file: string, data: any[]) {
  ensureDataFiles();
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8');
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const token = req.headers['x-approval-token'] || req.query.token || req.body?.token;
  if (!token || token !== process.env.APPROVAL_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { id } = req.body || {};
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Missing draft id' });
  }

  const drafts = readJson(draftsFile);
  const approved = readJson(approvedFile);

  const idx = drafts.findIndex((d: any) => d.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Draft not found' });

  const draft = drafts[idx];
  drafts.splice(idx, 1);

  const approvedEntry = {
    ...draft,
    status: 'approved',
    approvedAt: new Date().toISOString(),
  };
  approved.push(approvedEntry);

  writeJson(draftsFile, drafts);
  writeJson(approvedFile, approved);

  return res.status(200).json({ ok: true, id });
}
