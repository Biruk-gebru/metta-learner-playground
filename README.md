# MeTTa Docs & Playground

[![CI](https://github.com/Biruk-gebru/metta-learner-playground/actions/workflows/test.yml/badge.svg)](https://github.com/Biruk-gebru/metta-learner-playground/actions/workflows/test.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Python](https://img.shields.io/badge/Python-3.11+-blue.svg)](https://python.org/)
[![Next.js](https://img.shields.io/badge/Next.js-13+-black.svg)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-blue.svg)](https://www.typescriptlang.org/)

A modern documentation and interactive playground for the MeTTa language and Hyperon platform.

## 🚀 Live Demo

- **Website:** [https://metta-learner-playground.vercel.app](https://metta-learner-playground.vercel.app)
- **Backend API:** [https://metta-learner-playground-2.onrender.com](https://metta-learner-playground-2.onrender.com)

## 📖 Overview

This project provides:
- 🎯 **Interactive MeTTa code playground** (frontend, Next.js + React)
- 📚 **Comprehensive documentation** and tutorials for MeTTa and Hyperon
- 🔗 **Python/MeTTa integration** examples
- 🎨 **Modern UI/UX** with responsive design
- 🔄 **Automatic atomspace reset** for clean code execution
- 🌐 **Open source, community-driven** development

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 13+ with TypeScript
- **UI:** React 18, Tailwind CSS
- **Code Editor:** CodeMirror 6 with MeTTa syntax highlighting
- **Deployment:** Vercel

### Backend
- **Framework:** Flask (Python)
- **MeTTa Engine:** Hyperon
- **Deployment:** Render
- **CORS:** Configured for secure cross-origin requests

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+ recommended)
- Python 3.11+
- pip (for backend)

### Frontend (Docs & Playground)
```bash
cd guide-metta/meTTa-docs-site
npm install
npm run dev # Development server
# or
npm run build && npm start # Production build
```

### Backend (MeTTa API)
```bash
cd guide-metta/backend
pip install -r requirements.txt
python app.py
```

## 🎮 Usage

1. **Visit the frontend** in your browser (localhost or Vercel link)
2. **Write and run MeTTa or Python code** in the interactive playground
3. **Use the reset button** to clear the MeTTa session (automatic atomspace reset)
4. **Explore documentation** with Python/MeTTa integration examples

### Environment Configuration

#### Frontend Environment Variables
```bash
# Set your backend URL for deployments
NEXT_PUBLIC_API_URL=https://metta-learner-playground-2.onrender.com
```
> **Note:** `NEXT_PUBLIC_` variables are baked at build time; redeploy the frontend after changes.

#### Backend CORS Configuration
```bash
# Set your frontend origin for CORS
FRONTEND_URL=https://metta-learner-playground.vercel.app
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Quick Contribution Steps
1. 🍴 Fork the repo and create a feature branch
2. 🔧 Make your changes (see `CONTRIBUTING.md` for style guidelines)
3. ✅ Ensure all tests and CI checks pass
4. 📝 Open a pull request with a clear description

### Development Setup
```bash
# Clone the repository
git clone https://github.com/Biruk-gebru/metta-learner-playground.git
cd metta-learner-playground

# Install dependencies
cd guide-metta/meTTa-docs-site && npm install
cd ../backend && pip install -r requirements.txt

# Run development servers
# Terminal 1: Frontend
cd guide-metta/meTTa-docs-site && npm run dev

# Terminal 2: Backend
cd guide-metta/backend && python app.py
```

## 🧪 Testing

Our CI/CD pipeline includes:
- ✅ **TypeScript type checking**
- 🏗️ **Frontend build verification**
- 🔧 **Backend API testing**
- 🔗 **Integration tests** for MeTTa and Python code execution

## 📦 Deployment

### Frontend (Vercel)
- Automatic deployment from main branch
- Environment variables configured in Vercel dashboard

### Backend (Render)
- See `guide-metta/backend/DEPLOYMENT.md` for detailed instructions
- Uses `render.yaml`, `Procfile`, and `runtime.txt` for configuration
- `/run-metta` and `/run-python` execute synchronously to avoid timeouts

## 📚 Documentation

- **API Documentation:** Available at `/api` endpoints
- **Development Guide:** See `README-DEV.md`
- **Deployment Guide:** See `guide-metta/backend/DEPLOYMENT.md`

## 🐛 Issues & Support

- **Bug Reports:** [Open an issue](https://github.com/Biruk-gebru/metta-learner-playground/issues)
- **Feature Requests:** [Create a feature request](https://github.com/Biruk-gebru/metta-learner-playground/issues)
- **Questions:** [Telegram Support](https://t.me/Biruk_Gebru)

## 📄 License

This project is open source under the [MIT License](LICENSE).

## 🙏 Credits

- **Created by:** [Biruk Gebru Jember (@Biruk-gebru)](https://github.com/Biruk-gebru)
- **MeTTa Language:** [Hyperon Project](https://github.com/trueagi-ai/hyperon)
- **Community:** All contributors and users

## 📈 Project Status

- ✅ **Active Development**
- ✅ **Production Ready**
- ✅ **Community Supported**
- 🔄 **Regular Updates**

---

⭐ **Star this repository if you find it helpful!**