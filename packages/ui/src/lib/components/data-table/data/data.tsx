import { type DataTableFacetedDropdownFilterOption } from '../types';

type Options = DataTableFacetedDropdownFilterOption[];

export const labels: Options = [
  {
    value: 'bug',
    label: 'Bug',
  },
  {
    value: 'feature',
    label: 'Feature',
  },
  {
    value: 'documentation',
    label: 'Documentation',
  },
];

export const statuses: Options = [
  {
    value: 'backlog',
    label: 'Backlog',
    icon: 'question-mark-circled',
  },
  {
    value: 'todo',
    label: 'Todo',
    icon: 'circle',
  },
  {
    value: 'in progress',
    label: 'In Progress',
    icon: 'timer',
  },
  {
    value: 'done',
    label: 'Done',
    icon: 'check-circle',
  },
  {
    value: 'canceled',
    label: 'Canceled',
    icon: 'circle-backslash',
  },
];

export const priorities: Options = [
  {
    label: 'Low',
    value: 'low',
    icon: 'arrow-down',
  },
  {
    label: 'Medium',
    value: 'medium',
    icon: 'equals',
  },
  {
    label: 'High',
    value: 'high',
    icon: 'arrow-up',
  },
];
