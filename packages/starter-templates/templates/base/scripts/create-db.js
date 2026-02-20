#!/usr/bin/env node
/**
 * Creates the PostgreSQL database from DATABASE_URL if it does not exist.
 * No-op for SQLite (file:...) or when DATABASE_URL is unset.
 */
import 'dotenv/config';
import pg from 'pg';

const { Client } = pg;

const url = process.env.DATABASE_URL;
if (!url || url.startsWith('file:')) {
  process.exit(0);
}

const match = url.match(/\/([^/?]+)(\?.*)?$/);
const dbName = match ? decodeURIComponent(match[1]) : null;
if (!dbName) {
  console.error('create-db: could not parse database name from DATABASE_URL');
  process.exit(1);
}

const adminUrl = url.replace(/\/([^/?]+)(\?.*)?$/, '/postgres$2');

async function main() {
  const client = new Client({ connectionString: adminUrl });
  try {
    await client.connect();
    const { rows } = await client.query(
      'SELECT 1 AS exists FROM pg_database WHERE datname = $1',
      [dbName],
    );
    if (rows.length > 0 && rows[0].exists) {
      process.exit(0);
    }
    await client.query(`CREATE DATABASE "${dbName.replace(/"/g, '""')}"`);
  } catch (err) {
    console.error('create-db:', err.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

main();
