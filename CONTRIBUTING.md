# Contributing to MeTTa Docs & Playground

Thank you for your interest in contributing to the MeTTa Docs & Playground! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Types of Contributions

We welcome various types of contributions:

- 🐛 **Bug Reports** - Help us identify and fix issues
- ✨ **Feature Requests** - Suggest new features or improvements
- 📝 **Documentation** - Improve docs, tutorials, or examples
- 🔧 **Code Contributions** - Fix bugs or implement features
- 🎨 **UI/UX Improvements** - Enhance the user interface
- 🧪 **Testing** - Add tests or improve test coverage

### Before You Start

1. **Check existing issues** - Your idea might already be discussed
2. **Read the documentation** - Understand the project structure
3. **Set up your development environment** - Follow the setup guide below

## 🛠️ Development Setup

### Prerequisites

- Node.js (v18+)
- Python 3.11+
- Git
- A code editor (VS Code recommended)

### Local Development

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/metta-learner-playground.git
   cd metta-learner-playground
   ```

2. **Set up the frontend**
   ```bash
   cd guide-metta/meTTa-docs-site
   npm install
   npm run dev
   ```

3. **Set up the backend**
   ```bash
   cd guide-metta/backend
   pip install -r requirements.txt
   python app.py
   ```

4. **Configure environment variables**
   ```bash
   # Frontend (.env.local)
   NEXT_PUBLIC_API_URL=http://localhost:5000
   
   # Backend (environment variables)
   FRONTEND_URL=http://localhost:3000
   ```

## 📝 Code Style Guidelines

### Frontend (TypeScript/React)

- **TypeScript**: Use strict typing, avoid `any` when possible
- **React**: Use functional components with hooks
- **Styling**: Use Tailwind CSS classes
- **Naming**: Use camelCase for variables, PascalCase for components
- **Imports**: Group imports (React, third-party, local)

```typescript
// Good example
import React, { useState, useEffect } from 'react';
import { FaPlay, FaStop } from 'react-icons/fa';
import CodeEditor from '../components/CodeEditor';

interface CodeBlockProps {
  initialCode: string;
  language: 'python' | 'metta';
}

const CodeBlock: React.FC<CodeBlockProps> = ({ initialCode, language }) => {
  const [isRunning, setIsRunning] = useState(false);
  
  // Component logic here
};
```

### Backend (Python/Flask)

- **Python**: Follow PEP 8 style guide
- **Flask**: Use blueprints for route organization
- **Error handling**: Use proper exception handling
- **Documentation**: Add docstrings to functions

```python
# Good example
from flask import Flask, request, jsonify
from typing import Dict, Any

def run_metta_code(code: str, language: str) -> Dict[str, Any]:
    """
    Execute MeTTa code and return results.
    
    Args:
        code: The code to execute
        language: Programming language ('metta' or 'python')
        
    Returns:
        Dictionary containing execution results
    """
    try:
        # Implementation here
        return {"result": "success", "output": output}
    except Exception as e:
        return {"error": str(e)}
```

## 🔄 Git Workflow

### Branch Naming

Use descriptive branch names:
- `feature/navigation-improvements`
- `fix/typescript-errors`
- `docs/api-documentation`
- `test/integration-tests`

### Commit Messages

Follow conventional commit format:
```
type(scope): description

feat(navigation): add sticky sidebar with improved contrast
fix(backend): resolve CORS configuration issues
docs(readme): update installation instructions
test(ci): add integration tests for code execution
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Pull Request Process

1. **Create a feature branch** from `main`
2. **Make your changes** following the style guidelines
3. **Test your changes** locally
4. **Commit your changes** with clear messages
5. **Push to your fork** and create a PR
6. **Fill out the PR template** completely
7. **Wait for review** and address feedback

## 🧪 Testing

### Frontend Testing

```bash
# Type checking
npx tsc --noEmit

# Build verification
npm run build

# Development server
npm run dev
```

### Backend Testing

```bash
# Install dependencies
pip install -r requirements.txt

# Run the application
python app.py

# Test endpoints manually or with curl
curl -X POST http://localhost:5000/run-metta \
  -H "Content-Type: application/json" \
  -d '{"code": "(+ 2 3)", "language": "metta"}'
```

### Integration Testing

Our CI/CD pipeline automatically runs:
- TypeScript type checking
- Frontend build verification
- Backend API testing
- Integration tests for MeTTa/Python execution

## 📋 Pull Request Template

When creating a PR, please include:

### Description
- What does this PR do?
- Why is this change needed?
- How does it work?

### Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Code refactoring
- [ ] Test addition

### Testing
- [ ] Local testing completed
- [ ] All tests pass
- [ ] Manual testing performed

### Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes

## 🐛 Reporting Issues

### Bug Reports

When reporting bugs, please include:

1. **Clear description** of the issue
2. **Steps to reproduce**
3. **Expected vs actual behavior**
4. **Environment details** (OS, browser, Node.js version)
5. **Screenshots** if applicable
6. **Console errors** if any

### Feature Requests

For feature requests:

1. **Clear description** of the feature
2. **Use case** and benefits
3. **Mockups** or examples if applicable
4. **Implementation suggestions** if you have ideas

## 📞 Getting Help

- **GitHub Issues**: [Create an issue](https://github.com/Biruk-gebru/metta-learner-playground/issues)
- **Telegram**: [Join our community](https://t.me/Biruk_Gebru)
- **Documentation**: Check `README.md` and `README-DEV.md`

## 🎉 Recognition

Contributors will be recognized in:
- Repository README
- Release notes
- Community acknowledgments

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to the MeTTa community! 🚀
