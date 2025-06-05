import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Typography,
} from '@veraclins-dev/ui';

import { Chips } from './chips';

export function Badges() {
  return (
    <div className="flex gap-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Badges</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-16">
          <div className="flex gap-4 flex-wrap">
            <div className="flex flex-col gap-3">
              <Typography variant="h3">Solid</Typography>

              <Badge variant="solid" color="primary">
                Primary
              </Badge>

              <Badge variant="solid" color="secondary">
                Secondary
              </Badge>

              <Badge variant="solid" color="destructive">
                Destructive
              </Badge>

              <Badge variant="solid" color="success">
                Success
              </Badge>

              <Badge variant="solid" color="warning">
                Warning
              </Badge>

              <Badge variant="solid" color="info">
                Info
              </Badge>
            </div>
            <div className="flex flex-col gap-3">
              <Typography variant="h3">Soft</Typography>

              <Badge variant="soft" color="primary">
                Primary
              </Badge>

              <Badge variant="soft" color="secondary">
                Secondary
              </Badge>

              <Badge variant="soft" color="destructive">
                Destructive
              </Badge>

              <Badge variant="soft" color="success">
                Success
              </Badge>

              <Badge variant="soft" color="warning">
                Warning
              </Badge>

              <Badge variant="soft" color="info">
                Info
              </Badge>
            </div>
            <div className="flex flex-col gap-3">
              <Typography variant="h3">Outline</Typography>

              <Badge variant="outline" color="primary">
                Primary
              </Badge>

              <Badge variant="outline" color="secondary">
                Secondary
              </Badge>

              <Badge variant="outline" color="destructive">
                Destructive
              </Badge>

              <Badge variant="outline" color="success">
                Success
              </Badge>

              <Badge variant="outline" color="warning">
                Warning
              </Badge>

              <Badge variant="outline" color="info">
                Info
              </Badge>
            </div>
            <div className="flex flex-col gap-3">
              <Typography variant="h3">Sizes</Typography>

              <Badge variant="outline" color="primary" size="md">
                Medium (md)
              </Badge>

              <Badge variant="outline" color="secondary" size="lg">
                Large (lg)
              </Badge>

              <Badge variant="outline" color="destructive" size="xl">
                Extra Large (xl)
              </Badge>

              <Badge variant="outline" color="success" size="sm">
                Small (sm)
              </Badge>

              <Badge variant="outline" color="warning" size="md">
                Medium (md)
              </Badge>

              <Badge variant="outline" color="info" size="lg">
                Large (lg)
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
      <Chips />
    </div>
  );
}
