import { describe, expect, it } from 'vitest';

import {
  getAllRequiredFeatures,
  mergePrismaSchemas,
  parsePrismaSchema,
} from './prisma-merge.js';

describe('prisma merge flows', () => {
  it('adds required feature dependencies', () => {
    const result = getAllRequiredFeatures(['notifications']);
    expect(result).toContain('notifications');
    expect(result).toContain('activity-logging');
  });

  it('parses header, models and enums', () => {
    const schema = `
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
}

model User {
  id String @id
}

enum Role {
  USER
}
`;

    const parsed = parsePrismaSchema(schema);
    expect(parsed.header).toContain('generator client');
    expect(parsed.models[0]).toContain('model User');
    expect(parsed.enums[0]).toContain('enum Role');
  });

  it('merges schemas and deduplicates model names', () => {
    const base = `
generator client {
  provider = "prisma-client-js"
}
datasource db {
  provider = "postgresql"
}
model User {
  id String @id
}
`;
    const feature = `
model User {
  id String @id
}

model Activity {
  id String @id
}
`;

    const merged = mergePrismaSchemas([base, feature]);
    expect(merged).toContain('generator client');
    expect(merged).toContain('model Activity');
    expect(merged.match(/model User/g)?.length).toBe(1);
  });
});
