import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Chip,
  Typography,
} from '@veraclins-dev/ui';

export function Chips() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Chips</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex gap-4 flex-wrap">
          <div className="flex flex-col gap-3">
            <Typography variant="h2">Solid</Typography>
            <Chip variant="solid" color="primary" label="Primary" />
            <Chip variant="solid" color="secondary" label="Secondary" />
            <Chip variant="solid" color="destructive" label="Destructive" />
            <Chip variant="solid" color="success" label="Success" />
            <Chip variant="solid" color="warning" label="Warning" />
            <Chip variant="solid" color="info" label="Info" />
          </div>
          <div className="flex flex-col gap-3">
            <Typography variant="h2">Soft</Typography>
            <Chip variant="soft" color="primary" label="Primary" />
            <Chip variant="soft" color="secondary" label="Secondary" />
            <Chip variant="soft" color="destructive" label="Destructive" />
            <Chip variant="soft" color="success" label="Success" />
            <Chip variant="soft" color="warning" label="Warning" />
            <Chip variant="soft" color="info" label="Info" />
          </div>
          <div className="flex flex-col gap-3">
            <Typography variant="h2">Outline</Typography>
            <Chip variant="outline" color="primary" label="Primary" />

            <Chip variant="outline" color="secondary" label="Secondary" />
            <Chip variant="outline" color="destructive" label="Destructive" />
            <Chip variant="outline" color="success" label="Success" />
            <Chip variant="outline" color="warning" label="Warning" />
            <Chip variant="outline" color="info" label="Info" />
          </div>
          <div className="flex flex-col gap-3">
            <Typography variant="h3">Sizes</Typography>
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
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
