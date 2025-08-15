# MeTTa Learner Development Guide

This guide explains how to set up and run the MeTTa Learner project for development.

## Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **Python 3** (v3.8 or higher)
- **Git**

### One-Command Startup

The easiest way to start development is using our startup script:

```bash
./start-dev.sh
```

This script will:
1. ✅ Check prerequisites (Node.js, Python)
2. ✅ Kill any existing processes on ports 3000 and 5000
3. ✅ Set up Python virtual environment
4. ✅ Install dependencies (if needed)
5. ✅ Start backend server on port 5000
6. ✅ Start frontend server on port 3000
7. ✅ Wait for both servers to be ready
8. ✅ Display URLs and status

### Manual Startup

If you prefer to start servers manually:

#### Backend (Python/Flask)
```bash
cd guide-metta/backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python3 app.py
```

#### Frontend (Next.js)
```bash
cd guide-metta/meTTa-docs-site
npm install
npm run dev
```

## Development URLs

Once both servers are running:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/health
- **Contribute Page**: http://localhost:3000/contribute

## Project Structure

```
metta-learner-playground/
├── start-dev.sh              # Development startup script
├── guide-metta/
│   ├── meTTa-docs-site/      # Frontend (Next.js)
│   │   ├── src/
│   │   │   ├── components/   # React components
│   │   │   ├── pages/        # Next.js pages
│   │   │   ├── sections/     # Content sections
│   │   │   └── styles/       # CSS styles
│   │   └── package.json
│   └── backend/              # Backend (Python/Flask)
│       ├── app.py            # Main Flask app
│       ├── requirements.txt  # Python dependencies
│       └── DEPLOYMENT.md     # Deployment guide
└── README.md
```

## Key Features

### Frontend Improvements
- ✅ **Modern UI Design**: Glassmorphism, gradients, better typography
- ✅ **Responsive Layout**: Works on desktop, tablet, and mobile
- ✅ **Dark Mode Support**: Automatic theme switching
- ✅ **Content Editor**: Easy content creation without HTML knowledge
- ✅ **Interactive Navigation**: Smooth scrolling and active states

### Backend Features
- ✅ **MeTTa Code Execution**: Run MeTTa code in real-time
- ✅ **Code History**: Track and replay code execution
- ✅ **Queue System**: Handle multiple concurrent requests
- ✅ **Health Checks**: Monitor server status
- ✅ **CORS Support**: Multiple deployment environments

### Content Contribution System
- ✅ **Visual Editor**: No HTML/markdown knowledge required
- ✅ **Template System**: Pre-built templates for different content types
- ✅ **Code Block Integration**: Easy addition of executable code
- ✅ **Preview Mode**: Real-time content preview
- ✅ **Export Options**: Download generated content

## Development Workflow

### Adding New Content

1. **Visit** http://localhost:3000/contribute
2. **Choose** a template (Tutorial, Project, or Reference)
3. **Edit** content using the visual editor
4. **Add** code blocks with syntax highlighting
5. **Preview** your content
6. **Save** and download the generated JSX

### Creating New Pages

1. **Add** new section in `src/sections/`
2. **Update** routing in `src/pages/[...slug].tsx`
3. **Add** navigation in `src/components/Sidebar.tsx`
4. **Test** the new page

### Backend API Development

1. **Add** new endpoints in `guide-metta/backend/app.py`
2. **Test** with curl or Postman
3. **Update** frontend to use new endpoints

## Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Kill processes on ports 3000 and 5000
lsof -ti:3000 | xargs kill -9
lsof -ti:5000 | xargs kill -9
```

#### Node Modules Issues
```bash
cd guide-metta/meTTa-docs-site
rm -rf node_modules package-lock.json
npm install
```

#### Python Dependencies Issues
```bash
cd guide-metta/backend
rm -rf venv
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

#### Network Issues
If npm install fails due to network issues:
```bash
npm config set registry https://registry.npmjs.org/
npm cache clean --force
npm install --timeout=60000 --retry=3
```

### Logs

- **Frontend logs**: Check terminal where `npm run dev` is running
- **Backend logs**: Check terminal where `python3 app.py` is running
- **Startup script logs**: Colored output in terminal

## Deployment

See `guide-metta/backend/DEPLOYMENT.md` for backend deployment instructions.

## Contributing

1. **Fork** the repository
2. **Create** a feature branch
3. **Make** your changes
4. **Test** thoroughly
5. **Submit** a pull request

## Support

- **Discord**: https://discord.gg/opencog
- **GitHub Issues**: Report bugs and feature requests
- **Documentation**: Check the `/contribute` page for content guidelines 