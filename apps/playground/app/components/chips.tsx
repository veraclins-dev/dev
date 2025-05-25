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
    <Card>
      <CardHeader>
        <CardTitle>Chips</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex gap-4 flex-wrap">
          <div className="flex flex-col gap-3">
            <Typography variant="h2">Solid</Typography>

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
            <Typography variant="h2">Soft</Typography>
            <Chip variant="soft" label="Default" />
            <Chip variant="soft" color="primary" label="Primary" />
            <Chip variant="soft" color="secondary" label="Secondary" />
            <Chip variant="soft" color="destructive" label="Destructive" />
            <Chip variant="soft" color="success" label="Success" />
            <Chip variant="soft" color="warning" label="Warning" />
            <Chip variant="soft" color="info" label="Info" />
            <Chip variant="soft" color="accent" label="Accent" />
          </div>
          <div className="flex flex-col gap-3">
            <Typography variant="h2">Outline</Typography>
            <Chip variant="outline" color="default" label="Default" />
            <Chip variant="outline" color="primary" label="Primary" />

            <Chip variant="outline" color="secondary" label="Secondary" />
            <Chip variant="outline" color="destructive" label="Destructive" />
            <Chip variant="outline" color="success" label="Success" />
            <Chip variant="outline" color="warning" label="Warning" />
            <Chip variant="outline" color="info" label="Info" />
            <Chip variant="outline" color="accent" label="Accent" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
