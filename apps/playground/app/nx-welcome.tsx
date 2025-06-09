import { Box, Typography } from '@veraclins-dev/ui';

import { Badges } from './components/badges';
import { Boxes } from './components/boxes';
import { Buttons } from './components/buttons';
import { Cards } from './components/cards';
import { Colors } from './components/colors';
import { Dialogs } from './components/dialogs';
import { Inputs } from './components/inputs';
import { Links } from './components/links';

export function NxWelcome({ title }: { title: string }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={4}
      my={8}
      py={4}
      className="container w-full h-full overflow-auto rounded-md"
    >
      <Typography variant="h1" className="text-center">
        Welcome to <span className="text-primary">{title}</span>
        <a
          className="text-primary"
          href="https://vercel.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Vercel
        </a>
      </Typography>
      <Dialogs />
      <Colors />
      <Buttons />
      <Links />
      <Badges />
      <Inputs />
      <Boxes />
      <Cards />
    </Box>
  );
}

export default NxWelcome;
