import { Box, Typography } from '@veraclins-dev/ui';

export const Subject = ({
  heading,
  subtext,
}: {
  heading: string;
  subtext: string;
}) => (
  <Box display="flex" flexDirection="column" gapY={2}>
    <Typography variant="h2">{heading}</Typography>
    <Typography variant="body1">{subtext}</Typography>
  </Box>
);
