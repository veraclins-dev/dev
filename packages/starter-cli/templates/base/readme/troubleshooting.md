## 🆘 Troubleshooting

### Database Connection Issues

- Verify \`DATABASE_URL\` in \`.env\` is correct
- {{DATABASE_TROUBLESHOOTING}}

### Port Already in Use

- Change \`PORT\` in \`.env\` to a different port
- Or stop the process using port 3000

### Missing Dependencies

- Run \`pnpm install\` from the monorepo root
- Clear \`node_modules\` and reinstall if needed

### Prisma Client Not Generated

- Run \`nx run {{PROJECT_NAME}}:prisma:gen\` to regenerate the Prisma client
