import { Image } from '@veraclins-dev/image';
import { Box, Icon, Typography } from '@veraclins-dev/ui';
import { cn } from '@veraclins-dev/utils';

import individualGroupPage from '../../../assets/images/group-page.svg';
import inviteFriendsPage from '../../../assets/images/invite-friends-page.svg';
import questionForm from '../../../assets/images/question-form-page.svg';
import { Link } from '../../../components/link';

import { Subject } from './subject';

type UseCaseCardProps = {
  title: string;
  subtext: string;
  image: string;
  imageAlt: string;
  linkUrl: string;
  linkText: string;
  reverse?: boolean;
};

const UseCaseCard = ({
  title,
  subtext,
  image,
  imageAlt,
  linkUrl,
  linkText,
  reverse = false,
}: UseCaseCardProps) => {
  return (
    <Box
      display="flex"
      justify="between"
      gap={4}
      items="center"
      flexDirection="column"
      className={cn(reverse ? 'lg:flex-row-reverse' : 'lg:flex-row')}
    >
      <Image
        src={image}
        alt={imageAlt}
        width={715}
        height={400}
        objectFit="cover"
        className="rounded-md"
      />

      <Box display="flex" flexDirection="column" gapY={4} className="lg:w-1/2">
        <Typography variant="h3" className="md:text-4xl">
          {title}
        </Typography>
        <Typography>{subtext}</Typography>

        <Link to={linkUrl} className="flex w-fit items-center" color="primary">
          {linkText}
          <Icon name="chevron-right" size="sm" />
        </Link>
      </Box>
    </Box>
  );
};

export const UseCaseSection = () => (
  <Box
    className="bg-primary-soft container w-full rounded-lg"
    p={4}
    display="flex"
    flexDirection="column"
    gapY={8}
  >
    <Subject
      heading="Empowering Students Through Collaborative Learning"
      subtext="Edulinks.ng is designed to facilitate open discussions among students.
				Ask questions, share insights and collaborate with peers to enhance your
				academic experience."
    />

    <UseCaseCard
      image={questionForm}
      title="Easily Ask Questions and Get answers From Your Peers"
      subtext="This feature allows students to type their question, add relevant tags and get responses from peers, helping them grow their knowledge through shared learning."
      imageAlt="A question form"
      linkUrl="/questions/new"
      linkText="Ask your question"
      reverse
    />
    <UseCaseCard
      image={individualGroupPage}
      title="Join or create groups to collaborate and share ideas"
      subtext="This feature lets you join or create communities around your courses, study interests, or career goals, where you can collaborate with fellow students on academic projects and share knowledge."
      imageAlt="Individual Group"
      linkUrl="/groups"
      linkText="Join now"
    />
    <UseCaseCard
      image={inviteFriendsPage}
      title="Invite Friends to Enhance Your Learning Journey"
      subtext="This feature lets you bring friends, classmates, or colleagues onto the platform to create a more engaging and supportive learning experience."
      imageAlt="Invite Friends"
      linkUrl="/invite"
      linkText="Just Invite Now"
      reverse
    />
  </Box>
);
