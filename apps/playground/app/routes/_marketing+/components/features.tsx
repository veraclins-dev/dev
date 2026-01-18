import { Box } from '@veraclins-dev/ui';

import connections from '../../../assets/images/connections.svg';
import create from '../../../assets/images/create.svg';
import helpingHand from '../../../assets/images/helping-hand.svg';
import searchLens from '../../../assets/images/search.svg';

import { ContentCard } from './content-card';

const FEATURES = [
  {
    header: 'Ask Questions Anytime, Anywhere',
    description:
      'Post your queries and receive answers from fellow students who share your interests and challenges.',
    image: searchLens,
    imageAlt: 'Search lens',
  },
  {
    header: 'Share Your Knowledge by Answering',
    description:
      'Help others by providing answers and insights based on your own experiences and expertise.',
    image: helpingHand,
    imageAlt: 'Helping hand',
  },
  {
    header: 'Create Groups for Focused Discussions',
    description:
      'Form groups around specific subjects to collaborate and deepen your understanding with like-minded peers.',
    image: create,
    imageAlt: 'Pencil drawing',
  },
  {
    header: 'Invite Friends to Join the Conversation',
    description:
      'Expand your network by inviting friends to share knowledge and grow together academically.',
    image: connections,
    imageAlt: 'Connections',
  },
];

export const FeatureSection = () => {
  return (
    <Box
      display="grid"
      gap={4}
      className="bg-primary-soft w-full grid-cols-1 rounded-md md:grid-cols-2 lg:grid-cols-4"
      p={4}
    >
      {FEATURES.map(({ image, description, header, imageAlt }) => (
        <ContentCard
          description={description}
          header={header}
          image={image}
          imageAlt={imageAlt}
          key={header}
        />
      ))}
    </Box>
  );
};
