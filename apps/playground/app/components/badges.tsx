import { useRef } from 'react';

import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Chip,
  Typography,
} from '@veraclins-dev/ui';

export function Badges() {
  const titleRef = useRef<HTMLDivElement>(null);
  return (
    <div className="flex gap-8">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Badges</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-16">
          <div className="flex gap-4 flex-wrap">
            <div className="flex flex-col gap-3">
              <Typography ref={titleRef} variant="body2">
                Solid
              </Typography>
              <Badge variant="solid">Default</Badge>

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

              <Badge variant="solid" color="accent">
                Accent
              </Badge>
            </div>
            <div className="flex flex-col gap-3">
              <Typography variant="h3">Soft</Typography>

              <Badge variant="soft">Default</Badge>

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

              <Badge variant="soft" color="accent">
                Accent
              </Badge>
            </div>
            <div className="flex flex-col gap-3">
              <Typography variant="h3">Outline</Typography>

              <Badge variant="outline" color="default">
                Default
              </Badge>

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

              <Badge variant="outline" color="accent">
                Accent
              </Badge>
            </div>
            <div className="flex flex-col gap-3">
              <Typography variant="h3">Sizes</Typography>

              <Badge variant="outline" color="default" size="sm">
                Small (sm)
              </Badge>

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

              <Badge variant="outline" color="accent" size="xl">
                Extra Large (xl)
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Chips</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-16">
          <div className="flex gap-4 flex-wrap">
            <div className="flex flex-col gap-3">
              <Typography variant="h3">Solid</Typography>

              <Chip variant="solid" label="Default" />
              <Chip variant="solid" color="primary" label="Primary" />
              <Chip variant="solid" color="secondary" label="Secondary" />
              <Chip variant="solid" color="destructive" label="Destructive" />
              <Chip variant="solid" color="success" label="Success" />
              <Chip variant="solid" color="warning" label="Warning" />
              <Chip variant="solid" color="info" label="Info" />
              <Chip variant="solid" color="accent" label="Accent" />
            </div>
            <div className="flex flex-col gap-3">
              <Typography variant="h3">Soft</Typography>
              <Chip
                variant="soft"
                onRemove={() => {
                  console.log('removed');
                }}
                label="Default"
              />
              <Chip
                variant="soft"
                onRemove={() => {
                  console.log('removed');
                }}
                color="primary"
                label="Primary"
              />
              <Chip
                variant="soft"
                onRemove={() => {
                  console.log('removed');
                }}
                color="secondary"
                label="Secondary"
              />
              <Chip
                variant="soft"
                onRemove={() => {
                  console.log('removed');
                }}
                color="destructive"
                label="Destructive"
              />
              <Chip
                variant="soft"
                onRemove={() => {
                  console.log('removed');
                }}
                color="success"
                label="Success"
              />
              <Chip
                variant="soft"
                onRemove={() => {
                  console.log('removed');
                }}
                color="warning"
                label="Warning"
              />
              <Chip
                variant="soft"
                onRemove={() => {
                  console.log('removed');
                }}
                color="info"
                label="Info"
              />
              <Chip
                variant="soft"
                onRemove={() => {
                  console.log('removed');
                }}
                color="accent"
                label="Accent"
              />
            </div>
            <div className="flex flex-col gap-3">
              <Typography variant="h3">Outline</Typography>
              <Chip
                variant="outline"
                onRemove={() => {
                  console.log('removed');
                }}
                color="default"
                label="Default"
              />
              <Chip
                variant="outline"
                onRemove={() => {
                  console.log('removed');
                }}
                color="primary"
                label="Primary"
              />

              <Chip
                variant="outline"
                onRemove={() => {
                  console.log('removed');
                }}
                color="secondary"
                label="Secondary"
              />
              <Chip
                variant="outline"
                onRemove={() => {
                  console.log('removed');
                }}
                color="destructive"
                label="Destructive"
              />
              <Chip
                variant="outline"
                onRemove={() => {
                  console.log('removed');
                }}
                color="success"
                label="Success"
              />
              <Chip
                variant="outline"
                onRemove={() => {
                  console.log('removed');
                }}
                color="warning"
                label="Warning"
              />
              <Chip
                variant="outline"
                onRemove={() => {
                  console.log('removed');
                }}
                color="info"
                label="Info"
              />
              <Chip
                variant="outline"
                onRemove={() => {
                  console.log('removed');
                }}
                color="accent"
                label="Accent"
              />
            </div>
            <div className="flex flex-col gap-3">
              <Typography variant="h3">Sizes</Typography>
              <Chip
                variant="outline"
                onRemove={() => {
                  console.log('removed');
                }}
                color="default"
                label="Small (sm)"
                size="sm"
              />
              <Chip
                variant="outline"
                onRemove={() => {
                  console.log('removed');
                }}
                color="primary"
                label="Medium (md)"
                size="md"
              />

              <Chip
                variant="outline"
                onRemove={() => {
                  console.log('removed');
                }}
                color="secondary"
                label="Large (lg)"
                size="lg"
              />
              <Chip
                variant="outline"
                onRemove={() => {
                  console.log('removed');
                }}
                color="destructive"
                label="Extra Large (xl)"
                size="xl"
              />
              <Chip
                variant="outline"
                onRemove={() => {
                  console.log('removed');
                }}
                color="success"
                label="Small (sm)"
                size="sm"
              />
              <Chip
                variant="outline"
                onRemove={() => {
                  console.log('removed');
                }}
                color="warning"
                label="Medium (md)"
                size="md"
              />
              <Chip
                variant="outline"
                onRemove={() => {
                  console.log('removed');
                }}
                color="info"
                label="Large (lg)"
                size="lg"
              />
              <Chip
                variant="outline"
                onRemove={() => {
                  console.log('removed');
                }}
                color="accent"
                label="Extra Large (xl)"
                size="xl"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
