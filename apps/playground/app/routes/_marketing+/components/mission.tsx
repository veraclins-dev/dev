import { Image } from '@veraclins-dev/image';
import { Box, Icon, Typography } from '@veraclins-dev/ui';

import duoReading from '../../../assets/images/duo-reading.svg';
import { LinkButton } from '../../../components/link';

export const MissionSection = () => (
  <Box
    p={4}
    display="flex"
    flexDirection="column"
    justify="between"
    items="center"
    gap={4}
    className="bg-primary-soft container w-full flex-col-reverse rounded-lg lg:flex-row"
  >
    <Box
      display="flex"
      flexDirection="column"
      gapY={3}
      className="w-full lg:w-1/3"
    >
      <Icon name="arrow-down-circle" size="xl" className="mr-auto" />
      <Typography variant="h3" className="md:text-4xl">
        Unlock Your Potential with Edulinks.ng
      </Typography>
      <Typography variant="body1">
        Edulinks.ng empowers undergraduates to enhance their careers through
        collaborative learning. Connect with peers, share insights, and grow.
      </Typography>

      <LinkButton
        to="/auth/signup"
        className="mr-auto"
        variant="solid"
        color="primary"
      >
        Join Us Today
      </LinkButton>
    </Box>

    <Image src={duoReading} alt="two people reading" width={677} height={544} />
  </Box>
);
