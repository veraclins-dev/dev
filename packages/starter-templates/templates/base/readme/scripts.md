## 📦 Available Scripts

Run these commands from the **monorepo root**:

- \`nx dev {{PROJECT_NAME}}\` - Start development server
- \`nx build {{PROJECT_NAME}}\` - Build for production
- \`nx test {{PROJECT_NAME}}\` - Run unit tests
- \`nx lint {{PROJECT_NAME}}\` - Lint code

### Project-Specific Scripts

You can also run scripts directly from the project directory:

- \`nx run {{PROJECT_NAME}}:prisma:studio\` - Open Prisma Studio (database GUI)
- \`nx run {{PROJECT_NAME}}:prisma:migrate\` - Create and apply migrations
- \`nx run {{PROJECT_NAME}}:prisma:gen\` - Generate Prisma Client
- \`nx run {{PROJECT_NAME}}:prisma:seed\` - Seed the database
- \`nx run {{PROJECT_NAME}}:test:e2e\` - Run end-to-end tests
