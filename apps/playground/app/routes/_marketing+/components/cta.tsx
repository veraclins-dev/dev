import { Box, Icon, Typography } from '@veraclins-dev/ui';

import { LinkButton } from '../../../components/link';

export const CTASection = () => {
  return (
    <Box
      py={10}
      display="flex"
      gapY={4}
      flexDirection="column"
      className="container h-70 bg-[url(/group-interactive-learning.png)] text-white"
    >
      <Typography variant="h3" className="md:text-4xl">
        Join the Edulinks.ng Community Today.
      </Typography>
      <Typography variant="body1">
        Sign up or log in to connect, ask questions, and share knowledge with
        peers.
      </Typography>

      <Box display="flex" gapX={4}>
        <LinkButton to="/questions/new" variant="solid" color="primary">
          <Icon name="plus">Ask A Question</Icon>
        </LinkButton>
        <LinkButton to="/questions" variant="outline" className="border-white">
          View Questions
        </LinkButton>
      </Box>
    </Box>
  );
};
