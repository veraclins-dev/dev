import { Box } from '@veraclins-dev/ui';

import { PlatformSocials } from '../components/platform-socials';

import { BenefitSection } from './_marketing+/components/benefits';
import { CTASection } from './_marketing+/components/cta';
import { FeatureSection } from './_marketing+/components/features';
import { HeroSection } from './_marketing+/components/hero';
import { MissionSection } from './_marketing+/components/mission';
import { Subject } from './_marketing+/components/subject';
import { UseCaseSection } from './_marketing+/components/use-cases';

export default function Index() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      items="center"
      className="bg-card w-full"
      gapY={8}
      pb={8}
    >
      <Box
        display="flex"
        flexDirection="column"
        items="center"
        py={12}
        className="bg-primary-soft"
      >
        <HeroSection />
      </Box>

      <Box display="flex" flexDirection="column" className="container" gapY={8}>
        <Subject
          heading="Empower Your Learning Journey with Edulinks.ng"
          subtext="Edulinks.ng is designed to facilitate open discussions among
						students. Ask questions, share insights and collaborate with peers
						to enhance your academic experience."
        />
        <FeatureSection />

        <UseCaseSection />

        <BenefitSection />

        <MissionSection />
      </Box>

      <CTASection />

      <Box className="container">
        <PlatformSocials />
      </Box>
    </Box>
  );
}
