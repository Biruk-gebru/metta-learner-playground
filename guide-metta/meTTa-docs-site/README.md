# MeTTa Docs & Playground

A modern documentation and interactive playground for the MeTTa language and Hyperon platform.

## Overview

This project provides:
- Interactive MeTTa code playground (frontend, Next.js + React)
- Documentation and tutorials for MeTTa and Hyperon
- Python/MeTTa integration examples
- Open source, community-driven development

## Live Demo

- Frontend: [Vercel deployment link here]
- Backend: [Railway deployment link here]

## Installation

### Prerequisites
- Node.js (v18+ recommended)
- Python 3.8+
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
- Write and run MeTTa code in the playground
- Use the reset button to clear the session
- Python/MeTTa integration examples are provided in the docs

## Contributing

We welcome contributions! To get started:
1. Fork the repo and create a feature branch
2. Make your changes (see `CONTRIBUTING.md` for style and PR guidelines)
3. Ensure all tests and CI checks pass
4. Open a pull request

### CI/CD
- [![CI](https://github.com/your-org/your-repo/actions/workflows/ci.yml/badge.svg)](https://github.com/your-org/your-repo/actions)
- All PRs are checked for lint, build, and test status

## License

This project is open source under the MIT License.

## Credits
- Created by [Biruk Gebru Jember (@Biruk-gebru)](https://github.com/Biruk-gebru)

## Contact
- For questions or support, open an issue or contact the maintainers via GitHub. 