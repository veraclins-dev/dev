import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

import { endOfPeriod, getDateRange } from '@veraclins-dev/utils';

import {
  DateDropdown,
  type DateDropdownValue,
} from '../../../../components/dates/select';

export function PeriodSelect() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState<DateDropdownValue>(
    getDateRange({ from: 'Last 7 days' }),
  );

  useEffect(() => {
    const urlStart = searchParams.get('from');
    const urlEnd = searchParams.get('to') ?? endOfPeriod('Today').toISOString();
    if (!urlStart) {
      return;
    }

    setValue(getDateRange({ from: new Date(urlStart), to: new Date(urlEnd) }));
  }, [searchParams]);

  const handleChange = (value: DateDropdownValue) => {
    setValue(value);
    setSearchParams({ from: value.from, to: value.to });
  };

  return <DateDropdown value={value} onValueChange={handleChange} />;
}
