import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Icon,
  Typography,
} from '@veraclins-dev/ui';

export function Buttons() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Buttons</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex gap-4 flex-wrap">
          <div className="flex flex-col gap-3">
            <Typography variant="h2">Solid</Typography>
            <div className="flex gap-2">
              <Button variant="solid">Default</Button>
              <Button variant="solid" loading>
                Loading
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="solid" color="primary">
                Primary
              </Button>
              <Button variant="solid" color="primary" loading>
                Loading
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="solid" color="secondary">
                Secondary
              </Button>
              <Button variant="solid" color="secondary" loading>
                Loading
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="solid" color="destructive">
                Destructive
              </Button>
              <Button variant="solid" color="destructive" loading>
                Loading
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="solid" color="success">
                Success
              </Button>
              <Button variant="solid" color="success" loading>
                Loading
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="solid" color="warning">
                Warning
              </Button>
              <Button variant="solid" color="warning" loading>
                Loading
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="solid" color="info">
                Info
              </Button>
              <Button variant="solid" color="info" loading>
                Loading
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="solid" color="accent">
                Accent
              </Button>
              <Button variant="solid" color="accent" loading>
                Loading
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Typography variant="h2">Soft</Typography>
            <div className="flex gap-2">
              <Button variant="soft">Default</Button>
              <Button variant="soft" loading>
                Loading
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="soft" color="primary">
                Primary
              </Button>
              <Button variant="soft" color="primary" loading>
                Loading
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="soft" color="secondary">
                Secondary
              </Button>
              <Button variant="soft" color="secondary" loading>
                Loading
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="soft" color="destructive">
                Destructive
              </Button>
              <Button variant="soft" color="destructive" loading>
                Loading
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="soft" color="success">
                Success
              </Button>
              <Button variant="soft" color="success" loading>
                Loading
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="soft" color="warning">
                Warning
              </Button>
              <Button variant="soft" color="warning" loading>
                Loading
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="soft" color="info">
                Info
              </Button>
              <Button variant="soft" color="info" loading>
                Loading
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="soft" color="accent">
                Accent
              </Button>
              <Button variant="soft" color="accent" loading>
                Loading
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Typography variant="h2">Outline</Typography>
            <Button variant="outline" color="default" className="w-fit">
              <Icon name="plus" /> Add Item
            </Button>
            <Button
              variant="outline"
              color="default"
              className="w-fit"
              trailingIcon="plus"
            >
              Add Item
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" color="default">
                Default
              </Button>
              <Button variant="outline" color="default" loading>
                Loading
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" color="primary">
                Primary
              </Button>
              <Button variant="outline" color="primary" loading>
                Loading
              </Button>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" color="secondary">
                Secondary
              </Button>
              <Button variant="outline" color="secondary" loading>
                Loading
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" color="destructive">
                Destructive
              </Button>
              <Button variant="outline" color="destructive" loading>
                Loading
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" color="success">
                Success
              </Button>
              <Button variant="outline" color="success" loading>
                Loading
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" color="warning">
                Warning
              </Button>
              <Button variant="outline" color="warning" loading>
                Loading
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" color="info">
                Info
              </Button>
              <Button variant="outline" color="info" loading>
                Loading
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" color="accent">
                Accent
              </Button>
              <Button variant="outline" color="accent" loading>
                Loading
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Typography variant="h2">Text</Typography>
            <div className="flex gap-2">
              <Button variant="text" color="default">
                Default
              </Button>
              <Button variant="text" color="default" loading>
                Loading
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="text" color="primary">
                Primary
              </Button>
              <Button variant="text" color="primary" loading>
                Loading
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="text" color="secondary">
                Secondary
              </Button>
              <Button variant="text" color="secondary" loading>
                Loading
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="text" color="destructive">
                Destructive
              </Button>
              <Button variant="text" color="destructive" loading>
                Loading
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="text" color="success">
                Success
              </Button>
              <Button variant="text" color="success" loading>
                Loading
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="text" color="warning">
                Warning
              </Button>
              <Button variant="text" color="warning" loading>
                Loading
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="text" color="info">
                Info
              </Button>
              <Button variant="text" color="info" loading>
                Loading
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="text" color="accent">
                Accent
              </Button>
              <Button variant="text" color="accent" loading>
                Loading
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Typography variant="h2">Icon</Typography>
            <div className="flex gap-2">
              <Button size="icon" color="default" variant="solid">
                <Icon name="plus" />
              </Button>
              <Button size="icon" color="default" variant="soft">
                <Icon name="cog" />
              </Button>
              <Button size="icon" color="default" variant="outline">
                <Icon name="bell" />
              </Button>
              <Button size="icon" color="default" variant="text">
                <Icon name="heart" />
              </Button>
            </div>
            <div className="flex gap-2">
              <Button size="icon" color="primary" variant="solid">
                <Icon name="plus" />
              </Button>
              <Button size="icon" color="primary" variant="soft">
                <Icon name="cog" />
              </Button>
              <Button size="icon" color="primary" variant="outline">
                <Icon name="bell" />
              </Button>
              <Button size="icon" color="primary" variant="text">
                <Icon name="heart" />
              </Button>
            </div>
            <div className="flex gap-2">
              <Button size="icon" color="secondary" variant="solid">
                <Icon name="plus" />
              </Button>
              <Button size="icon" color="secondary" variant="soft">
                <Icon name="cog" />
              </Button>
              <Button size="icon" color="secondary" variant="outline">
                <Icon name="bell" />
              </Button>
              <Button size="icon" color="secondary" variant="text">
                <Icon name="heart" />
              </Button>
            </div>
            <div className="flex gap-2">
              <Button size="icon" color="destructive" variant="solid">
                <Icon name="plus" />
              </Button>
              <Button size="icon" color="destructive" variant="soft">
                <Icon name="cog" />
              </Button>
              <Button size="icon" color="destructive" variant="outline">
                <Icon name="bell" />
              </Button>
              <Button size="icon" color="destructive" variant="text">
                <Icon name="heart" />
              </Button>
            </div>
            <div className="flex gap-2">
              <Button size="icon" color="success" variant="solid">
                <Icon name="plus" />
              </Button>
              <Button size="icon" color="success" variant="soft">
                <Icon name="cog" />
              </Button>
              <Button size="icon" color="success" variant="outline">
                <Icon name="bell" />
              </Button>
              <Button size="icon" color="success" variant="text">
                <Icon name="heart" />
              </Button>
            </div>
            <div className="flex gap-2">
              <Button size="icon" color="warning" variant="solid">
                <Icon name="plus" />
              </Button>
              <Button size="icon" color="warning" variant="soft">
                <Icon name="cog" />
              </Button>
              <Button size="icon" color="warning" variant="outline">
                <Icon name="bell" />
              </Button>
              <Button size="icon" color="warning" variant="text">
                <Icon name="heart" />
              </Button>
            </div>
            <div className="flex gap-2">
              <Button size="icon" color="info" variant="solid">
                <Icon name="plus" />
              </Button>
              <Button size="icon" color="info" variant="soft">
                <Icon name="cog" />
              </Button>
              <Button size="icon" color="info" variant="outline">
                <Icon name="bell" />
              </Button>
              <Button size="icon" color="info" variant="text">
                <Icon name="heart" />
              </Button>
            </div>
            <div className="flex gap-2">
              <Button size="icon" color="accent" variant="solid">
                <Icon name="plus" />
              </Button>
              <Button size="icon" color="accent" variant="soft">
                <Icon name="cog" />
              </Button>
              <Button size="icon" color="accent" variant="outline">
                <Icon name="bell" />
              </Button>
              <Button size="icon" color="accent" variant="text">
                <Icon name="heart" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
