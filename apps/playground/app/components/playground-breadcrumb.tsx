import { Link as RouterLink } from 'react-router';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@veraclins-dev/ui';

interface PlaygroundBreadcrumbProps {
  currentPage: string;
  className?: string;
}

export function PlaygroundBreadcrumb({
  currentPage,
  className,
}: PlaygroundBreadcrumbProps) {
  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink component={RouterLink} to="/">
            {/* <Link component={RouterLink} to="/"> */}
            Playground
            {/* </Link> */}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{currentPage}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
