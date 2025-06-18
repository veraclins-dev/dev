import { styleText } from 'node:util';

import { badImageBase64 } from '../shared';

export function badImageResponse(message = 'Something went wrong') {
  console.error(styleText(['bold', 'yellow'], 'Error: ') + message);
  const buffer = Buffer.from(badImageBase64, 'base64');
  return new Response(buffer, {
    status: 500,
    headers: {
      'Cache-Control': 'max-age=0',
      'Content-Type': 'image/gif;base64',
      'Content-Length': buffer.length.toFixed(0),
    },
  });
}

export function getIntOrNull(value?: string | null) {
  if (value === null || value === undefined || value === '') {
    return null;
  }

  return Number.parseInt(value);
}
