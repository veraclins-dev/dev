import { useSearchParams } from 'react-router';

import { Image } from '@veraclins-dev/image';
import { Box, Icon, Typography } from '@veraclins-dev/ui';

import homeIllustration from '../../../assets/images/home_illustration.svg';
import { LinkButton } from '../../../components/link';

interface ViewQuestionsButtonProps {
  content: string | React.ReactNode;
  to: string | { pathname: string; search: string };
}

const ActionButtons = ({ content, to }: ViewQuestionsButtonProps) => {
  return (
    <>
      <LinkButton
        className="px-4 py-4 lg:px-7"
        to={to}
        color="secondary"
        variant="solid"
      >
        {content}
      </LinkButton>
      <LinkButton
        variant="outline"
        color="secondary"
        className="px-4 py-4 lg:px-7"
        to="/questions"
      >
        View questions
      </LinkButton>
    </>
  );
};

export const HeroSection = () => {
  const [searchParams] = useSearchParams();
  const user = { id: '' };

  const content = user?.id ? (
    <Icon name="plus" size="xs">
      Ask a question
    </Icon>
  ) : (
    'Get started'
  );

  const to = user?.id
    ? '/questions/new'
    : {
        pathname: '/auth/signup',
        search: searchParams.toString(),
      };

  return (
    <Box
      display="flex"
      flexDirection="column"
      className="container lg:flex-row-reverse"
    >
      <Box className="w-full lg:w-5/12">
        <Image
          src={homeIllustration}
          alt="Home Illustration"
          width={700}
          height={600}
          priority
        />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        items="center"
        pb={12}
        className="text-grey-50 flex-1 lg:items-start"
      >
        <Box
          mb={10}
          display="flex"
          flexDirection="column"
          items="center"
          className="text-center lg:mb-12 lg:text-left"
        >
          <Typography
            variant="h1"
            className="mb-3 md:text-6xl lg:mb-5 lg:text-7xl"
          >
            Learn, connect, and grow with students Like You
          </Typography>
          <Typography
            variant="body1"
            className="mt-4 w-11/12 text-xl md:w-full"
          >
            Join a vibrant community where students ask questions, share
            knowledge, and learn together — all in one place.
          </Typography>
        </Box>
        <Box
          display="grid"
          justify="center"
          gap={3}
          aria-busy
          className="w-full grid-cols-2 md:grid-cols-3 md:justify-start md:gap-8"
        >
          <ActionButtons to={to} content={content} />
        </Box>
      </Box>
    </Box>
  );
};
