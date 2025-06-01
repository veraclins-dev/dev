import { Typography } from '@veraclins-dev/ui';

import { Badges } from './components/badges';
import { Boxes } from './components/boxes';
import { Buttons } from './components/button';
import { Cards } from './components/cards';
import { Inputs } from './components/inputs';
import { Links } from './components/links';

export function NxWelcome({ title }: { title: string }) {
  return (
    <div className="container flex w-full gap-4 flex-col h-full my-8 overflow-auto rounded-md py-4">
      <Typography variant="h1" className="text-center">
        Welcome to <span className="text-primary">{title}</span>
      </Typography>
      <Buttons />
      <Links />
      <Badges />
      <Inputs />
      <Boxes />
      <Cards />
    </div>
  );
}

export default NxWelcome;
