# MeTTa Docs & Playground

A modern documentation and interactive playground for the MeTTa language and Hyperon platform.

## Overview

This project provides:
- Interactive MeTTa code playground (frontend, Next.js + React)
- Documentation and tutorials for MeTTa and Hyperon
- Python/MeTTa integration examples
- Open source, community-driven development

## Live Demo

- **Website:** [https://metta-learner-playground.vercel.app](https://metta-learner-playground.vercel.app)

## Installation

### Prerequisites
- Node.js (v18+ recommended)
- Python 3.12+
- pip (for backend)

### Frontend (Docs & Playground)
```bash
cd guide-metta/meTTa-docs-site
npm install
npm run dev # or npm run build && npm start
```

### Backend (MeTTa API)
```bash
cd guide-metta/backend
pip install -r requirements.txt  # Ensure hyperon is installed
python app.py
```

## Usage
- Visit the frontend in your browser (localhost or Vercel link)
- Write and run MeTTa or Python code in the playground
- Use the reset button to clear the MeTTa session
- Python/MeTTa integration examples are provided in the docs

### Frontend env variable
- Set `NEXT_PUBLIC_API_URL` to your backend URL for deployments (e.g., `https://metta-learner-playground-2.onrender.com`).
- Note: NEXT_PUBLIC_ vars are baked at build time; redeploy the frontend after changes.

### Backend CORS env
- Set `FRONTEND_URL` on the backend (Render) to your exact frontend origin (e.g., `https://metta-learner-playground.vercel.app`).

## Contributing

We welcome contributions! To get started:
1. Fork the repo and create a feature branch
2. Make your changes (see `CONTRIBUTING.md` for style and PR guidelines)
3. Ensure all tests and CI checks pass
4. Open a pull request

### CI/CD
- [![CI](https://github.com/Biruk-gebru/metta-learner-playground/actions/workflows/ci.yml/badge.svg)](https://github.com/Biruk-gebru/metta-learner-playground/actions/workflows/ci.yml)
- All PRs are checked for lint, build, and test status

### Deployment notes
- Backend runs on Render (see `guide-metta/backend/DEPLOYMENT.md`, `render.yaml`, `Procfile`, `runtime.txt`).
- `/run-metta` and `/run-python` execute synchronously to avoid reverse-proxy timeouts.

## License

This project is open source under the MIT License.

## Credits
- Created by [Biruk Gebru Jember (@Biruk-gebru)](https://github.com/Biruk-gebru)

## Contact
- For questions or support, open an issue or contact on Telegram: https://t.me/Biruk_Gebru