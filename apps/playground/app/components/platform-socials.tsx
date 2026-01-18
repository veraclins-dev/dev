import { Box, Icon, type IconName, Typography } from '@veraclins-dev/ui';

import { Card } from './card';

type SocialProps = {
  icon: IconName;
  label: string;
  link: string;
  value: string;
};

const socials: SocialProps[] = [
  {
    icon: 'x-logo',
    label: 'X (twitter)',
    link: 'https://twitter.com/edulink_nigeria',
    value: 'Edulinks Nigeria',
  },
  {
    icon: 'linkedin-logo',
    label: 'LinkedIn',
    link: 'https://www.linkedin.com/company/edulinks-nigeria',
    value: 'Edulinks Nigeria',
  },
  {
    icon: 'facebook-logo',
    label: 'Facebook',
    link: 'https://facebook.com/edulinks.nigeria',
    value: 'Edulinks Nigeria',
  },
  {
    icon: 'instagram-logo',
    label: 'Instagram',
    link: 'https://www.instagram.com/edulinksng',
    value: '@edulinksng',
  },
];

export const PlatformSocials = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      className="bg-primary-soft container rounded-lg"
      p={4}
      gapY={4}
    >
      <Box>
        <Typography variant="h3">Follow Us</Typography>
        <Typography>
          Join our community and never miss an update—follow Edulinks.ng for the
          latest news and insights!
        </Typography>
      </Box>

      <Box
        gap={4}
        display="grid"
        className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
      >
        {socials.map((item) => (
          <Card
            display="flex"
            flexDirection="column"
            className="text-center shadow-none"
            key={item.label}
            p={4}
            gapY={3}
            borderless
            elevated={false}
            justify="center"
          >
            <Icon name={item.icon} size="xl" />
            <Typography variant="h4">{item.label}</Typography>
            <a
              href={item.link}
              target="_blank"
              rel="noreferrer"
              referrerPolicy="no-referrer"
              className="border-none text-xs sm:text-sm"
            >
              {item.value}
            </a>
          </Card>
        ))}
      </Box>
    </Box>
  );
};
