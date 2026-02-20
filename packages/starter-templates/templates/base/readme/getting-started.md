## 🚀 Getting Started

### Prerequisites

- Node.js 22+
- {{DATABASE_TYPE}} (for database)
- pnpm (recommended) or npm

### Installation

1. **Install dependencies:**

\`\`\`bash
{{PACKAGE_MANAGER}} install
\`\`\`

2. **Set up environment variables:**

\`\`\`bash
# The .env file has been created with default values
# Update .env with your actual configuration values
# See .env.example for all available variables
\`\`\`

3. **Set up the project (database, build, seed, Playwright):**

\`\`\`bash
{{PACKAGE_MANAGER}} run setup
\`\`\`

4. **Create and apply migrations (run after setup, before dev):**

\`\`\`bash
{{PACKAGE_MANAGER}} run prisma:migrate
\`\`\`

5. **Start the development server:**

\`\`\`bash
{{PACKAGE_MANAGER}} run dev
\`\`\`

The application will be available at \`http://localhost:3000\`.
