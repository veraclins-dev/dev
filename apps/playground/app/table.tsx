import { DataTableComponent } from '@veraclins-dev/ui';

export function Page() {
  return (
    <div className="container bg-card flex w-full gap-4 flex-col h-full my-8 overflow-auto rounded-md py-4">
      <DataTableComponent />
    </div>
  );
}

export default Page;
