export const tableInstance = {
  _features: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
  options: {
    filterFromLeafRows: false,
    maxLeafRowFilterDepth: 100,
    groupedColumnMode: 'reorder',
    paginateExpandedRows: true,
    enableRowSelection: true,
    enableMultiRowSelection: true,
    enableSubRowSelection: true,
    columnResizeMode: 'onEnd',
    columnResizeDirection: 'ltr',
    state: {
      columnSizing: {},
      columnSizingInfo: {
        startOffset: null,
        startSize: null,
        deltaOffset: null,
        deltaPercentage: null,
        isResizingColumn: false,
        columnSizingStart: [],
      },
      rowSelection: {},
      rowPinning: {
        top: [],
        bottom: [],
      },
      expanded: {},
      grouping: [],
      sorting: [],
      globalFilter: '',
      columnFilters: [],
      columnPinning: {
        left: [],
        right: [],
      },
      columnOrder: [],
      columnVisibility: {},
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
    renderFallbackValue: null,
    data: [
      {
        id: 'TASK-8782',
        title:
          "You can't compress the program without quantifying the open-source SSD pixel!",
        status: 'in progress',
        label: 'documentation',
        priority: 'medium',
      },
      {
        id: 'TASK-7878',
        title:
          'Try to calculate the EXE feed, maybe it will index the multi-byte pixel!',
        status: 'backlog',
        label: 'documentation',
        priority: 'medium',
      },
      {
        id: 'TASK-7839',
        title: 'We need to bypass the neural TCP card!',
        status: 'todo',
        label: 'bug',
        priority: 'high',
      },
      {
        id: 'TASK-5562',
        title:
          'The SAS interface is down, bypass the open-source pixel so we can back up the PNG bandwidth!',
        status: 'backlog',
        label: 'feature',
        priority: 'medium',
      },
      {
        id: 'TASK-8686',
        title:
          "I'll parse the wireless SSL protocol, that should driver the API panel!",
        status: 'canceled',
        label: 'feature',
        priority: 'medium',
      },
    ],
    columns: [
      {
        id: 'select',
        enableSorting: false,
        enableHiding: false,
        size: 40,
      },
      {
        accessorKey: 'id',
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: 'title',
        enableSorting: true,
        enableHiding: true,
      },
      {
        accessorKey: 'status',
        enableSorting: true,
        enableHiding: true,
      },
      {
        accessorKey: 'priority',
        enableSorting: true,
        enableHiding: true,
      },
      {
        id: 'actions',
        enableSorting: false,
        enableHiding: false,
        size: 80,
      },
    ],
    enableSorting: true,
  },
  initialState: {
    columnSizing: {},
    columnSizingInfo: {
      startOffset: null,
      startSize: null,
      deltaOffset: null,
      deltaPercentage: null,
      isResizingColumn: false,
      columnSizingStart: [],
    },
    rowSelection: {},
    rowPinning: {
      top: [],
      bottom: [],
    },
    expanded: {},
    grouping: [],
    sorting: [],
    columnFilters: [],
    columnPinning: {
      left: [],
      right: [],
    },
    columnOrder: [],
    columnVisibility: {},
    pagination: {
      pageIndex: 0,
      pageSize: 10,
    },
  },
};
