import { Box } from '@veraclins-dev/ui';

import duoReading from '../../../assets/images/duo-reading.svg';
import girlReading from '../../../assets/images/girl-reading.svg';
import groupLearning from '../../../assets/images/group-learning.svg';
import ladyWriting from '../../../assets/images/lady-writing.svg';

import { ContentCard } from './content-card';
import { Subject } from './subject';

export const BenefitSection = () => (
  <Box
    className="bg-primary-soft container w-full rounded-lg"
    p={4}
    display="flex"
    flexDirection="column"
    gapY={8}
  >
    <Subject
      heading="What You Gain Using Edulinks.ng"
      subtext="With Edulinks.ng, access tools, communities, and resources that help you
                learn smarter, collaborate better, and reach your academic goals.
                Here's what you gain:"
    />

    <Box display="grid" gap={4} className="w-full grid-cols-1 md:grid-cols-2">
      <ContentCard
        header="Quick Access to Knowledge"
        description="Easily ask questions and receive helpful answers from peers and professionals. Whether it’s an academic challenge or a career-related inquiry, Edulinks.ng gives you the support you need to find the right solutions fast."
        image={girlReading}
        imageAlt="a girl reading"
        width={300}
        height={220}
      />
      <ContentCard
        header="Collaborative & Supportive Learning Community"
        description="Build valuable relationships with students, graduates, and professionals across different fields. Learn together, share insights, and grow through shared experiences and guidance."
        image={groupLearning}
        imageAlt="group of people learning"
        width={300}
        height={220}
      />
      <ContentCard
        header="Networking & Career Connections"
        description="Build meaningful academic and professional relationships with students, and professionals to exchange ideas, and unlock new opportunities."
        image={ladyWriting}
        imageAlt="a lady writing"
        width={300}
        height={220}
      />
      <ContentCard
        header="Personal & Professional Growth"
        description="Through continuous learning and collaboration, Edulinks.ng helps you develop the skills, confidence, and connections needed to succeed in your studies and career."
        image={duoReading}
        imageAlt="two people reading together"
        width={300}
        height={220}
      />
    </Box>
  </Box>
);
