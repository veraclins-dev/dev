import { Image } from '@veraclins-dev/image';
import { Typography } from '@veraclins-dev/ui';

import { Card } from '../../../components/card';

export const ContentCard = ({
  description,
  header,
  image,
  imageAlt,
  height = 100,
  width = 100,
}: {
  header: string;
  description: string;
  image: string;
  imageAlt: string;
  height?: number;
  width?: number;
}) => (
  <Card
    display="flex"
    flexDirection="column"
    className="rounded-md shadow-none"
    key={header}
    gapY={4}
    borderless
    elevated={false}
  >
    <Image src={image} alt={imageAlt} width={width} height={height} />
    <Typography variant="h3">{header}</Typography>
    <Typography variant="body1">{description}</Typography>
  </Card>
);
