type SimpleStyle = 'display' | 'position' | 'visibility';

type ExtendedStyle =
  | 'overflow'
  | 'overflow-x'
  | 'overflow-y'
  | 'overscroll'
  | 'overscroll-x'
  | 'overscroll-y';

type LayoutStyle = SimpleStyle | ExtendedStyle;

type Display =
  | 'inline'
  | 'block'
  | 'inline-block'
  | 'flow-root'
  | 'flex'
  | 'inline-flex'
  | 'grid'
  | 'inline-grid'
  | 'contents'
  | 'table'
  | 'inline-table'
  | 'table-caption'
  | 'table-cell'
  | 'table-column'
  | 'table-column-group'
  | 'table-footer-group'
  | 'table-header-group'
  | 'table-row-group'
  | 'table-row'
  | 'list-item'
  | 'hidden'
  | 'sr-only'
  | 'not-sr-only';

type Overflow = 'auto' | 'hidden' | 'clip' | 'visible';

type Overscroll = 'auto' | 'contain' | 'none';

type Position = 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';

type Visibility = 'visible' | 'hidden' | 'collapse';

type SimpleValue = Display | Position | Visibility;

type ExtendedValue = Overflow | Overscroll;

type LayoutValue<T extends SimpleValue> = Record<T, T>;

type LayoutValueX<T extends ExtendedValue, U extends ExtendedStyle> = Record<
  T,
  `${U}-${T}`
>;

const display: Display[] = [
  'inline',
  'block',
  'inline-block',
  'flow-root',
  'flex',
  'inline-flex',
  'grid',
  'inline-grid',
  'contents',
  'table',
  'inline-table',
  'table-caption',
  'table-cell',
  'table-column',
  'table-column-group',
  'table-footer-group',
  'table-header-group',
  'table-row-group',
  'table-row',
  'list-item',
  'hidden',
  'sr-only',
  'not-sr-only',
];

const position: Position[] = [
  'static',
  'relative',
  'absolute',
  'fixed',
  'sticky',
];

const overflow: Overflow[] = ['auto', 'hidden', 'clip', 'visible'];

const overscroll: Overscroll[] = ['auto', 'contain', 'none'];

const visibility: Visibility[] = ['visible', 'hidden', 'collapse'];

type LayoutVariant<T extends LayoutStyle> = T extends 'display'
  ? LayoutValue<Display>
  : T extends 'overflow'
    ? LayoutValueX<Overflow, T>
    : T extends 'overflow-x'
      ? LayoutValueX<Overflow, T>
      : T extends 'overflow-y'
        ? LayoutValueX<Overflow, T>
        : T extends 'overscroll'
          ? LayoutValueX<Overscroll, T>
          : T extends 'overscroll-x'
            ? LayoutValueX<Overscroll, T>
            : T extends 'overscroll-y'
              ? LayoutValueX<Overscroll, T>
              : T extends 'position'
                ? LayoutValue<Position>
                : T extends 'visibility'
                  ? LayoutValue<Visibility>
                  : never;

const simple = {
  display,
  position,
  visibility,
} as const;

const extended = {
  overflow,
  'overflow-x': overflow,
  'overflow-y': overflow,
  overscroll,
  'overscroll-x': overscroll,
  'overscroll-y': overscroll,
} as const;

function generateSimpleVariants<T extends SimpleStyle>(
  value: T,
): LayoutVariant<T> {
  return simple[value].reduce((acc, curr) => {
    (acc as any)[curr] = curr;
    return acc;
  }, {} as LayoutVariant<T>);
}

function generateExtendedVariants<T extends ExtendedStyle>(
  value: T,
): LayoutVariant<T> {
  return extended[value].reduce((acc, curr) => {
    (acc as any)[curr] = `${value}-${curr}`;
    return acc;
  }, {} as LayoutVariant<T>);
}

const layoutVariants = {
  display: generateSimpleVariants('display'),
  position: generateSimpleVariants('position'),
  visibility: generateSimpleVariants('visibility'),
  overflow: generateExtendedVariants('overflow'),
  overflowX: generateExtendedVariants('overflow-x'),
  overflowY: generateExtendedVariants('overflow-y'),
  overscroll: generateExtendedVariants('overscroll'),
  overscrollX: generateExtendedVariants('overscroll-x'),
  overscrollY: generateExtendedVariants('overscroll-y'),
} as const;

type LayoutVariants = typeof layoutVariants;

export { type LayoutVariants, layoutVariants };

/*!
  // Base variants
  inline block inline-block flow-root flex inline-flex grid inline-grid contents table inline-table table-caption table-cell table-column table-column-group table-footer-group table-header-group table-row-group table-row list-item hidden sr-only not-sr-only
  overflow-auto overflow-hidden overflow-clip overflow-visible overflow-x-auto overflow-x-hidden overflow-x-clip overflow-x-visible overflow-y-auto overflow-y-hidden overflow-y-clip overflow-y-visible
  overscroll-auto overscroll-contain overscroll-none overscroll-x-auto overscroll-x-contain overscroll-x-none overscroll-y-auto overscroll-y-contain overscroll-y-none
  static relative absolute fixed sticky visible hidden collapse

  // Responsive variants
  sm:inline sm:block sm:inline-block sm:flow-root sm:flex sm:inline-flex sm:grid sm:inline-grid sm:contents sm:table sm:inline-table sm:table-caption sm:table-cell sm:table-column sm:table-column-group sm:table-footer-group sm:table-header-group sm:table-row-group sm:table-row sm:list-item sm:hidden sm:sr-only sm:not-sr-only
  sm:overflow-auto sm:overflow-hidden sm:overflow-clip sm:overflow-visible sm:overflow-x-auto sm:overflow-x-hidden sm:overflow-x-clip sm:overflow-x-visible sm:overflow-y-auto sm:overflow-y-hidden sm:overflow-y-clip sm:overflow-y-visible
  sm:overscroll-auto sm:overscroll-contain sm:overscroll-none sm:overscroll-x-auto sm:overscroll-x-contain sm:overscroll-x-none sm:overscroll-y-auto sm:overscroll-y-contain sm:overscroll-y-none
  sm:static sm:relative sm:absolute sm:fixed sm:sticky sm:visible sm:hidden sm:collapse

  md:inline md:block md:inline-block md:flow-root md:flex md:inline-flex md:grid md:inline-grid md:contents md:table md:inline-table md:table-caption md:table-cell md:table-column md:table-column-group md:table-footer-group md:table-header-group md:table-row-group md:table-row md:list-item md:hidden md:sr-only md:not-sr-only
  md:overflow-auto md:overflow-hidden md:overflow-clip md:overflow-visible md:overflow-x-auto md:overflow-x-hidden md:overflow-x-clip md:overflow-x-visible md:overflow-y-auto md:overflow-y-hidden md:overflow-y-clip md:overflow-y-visible
  md:overscroll-auto md:overscroll-contain md:overscroll-none md:overscroll-x-auto md:overscroll-x-contain md:overscroll-x-none md:overscroll-y-auto md:overscroll-y-contain md:overscroll-y-none
  md:static md:relative md:absolute md:fixed md:sticky md:visible md:hidden md:collapse

  lg:inline lg:block lg:inline-block lg:flow-root lg:flex lg:inline-flex lg:grid lg:inline-grid lg:contents lg:table lg:inline-table lg:table-caption lg:table-cell lg:table-column lg:table-column-group lg:table-footer-group lg:table-header-group lg:table-row-group lg:table-row lg:list-item lg:hidden lg:sr-only lg:not-sr-only
  lg:overflow-auto lg:overflow-hidden lg:overflow-clip lg:overflow-visible lg:overflow-x-auto lg:overflow-x-hidden lg:overflow-x-clip lg:overflow-x-visible lg:overflow-y-auto lg:overflow-y-hidden lg:overflow-y-clip lg:overflow-y-visible
  lg:overscroll-auto lg:overscroll-contain lg:overscroll-none lg:overscroll-x-auto lg:overscroll-x-contain lg:overscroll-x-none lg:overscroll-y-auto lg:overscroll-y-contain lg:overscroll-y-none
  lg:static lg:relative lg:absolute lg:fixed lg:sticky lg:visible lg:hidden lg:collapse

  xl:inline xl:block xl:inline-block xl:flow-root xl:flex xl:inline-flex xl:grid xl:inline-grid xl:contents xl:table xl:inline-table xl:table-caption xl:table-cell xl:table-column xl:table-column-group xl:table-footer-group xl:table-header-group xl:table-row-group xl:table-row xl:list-item xl:hidden xl:sr-only xl:not-sr-only
  xl:overflow-auto xl:overflow-hidden xl:overflow-clip xl:overflow-visible xl:overflow-x-auto xl:overflow-x-hidden xl:overflow-x-clip xl:overflow-x-visible xl:overflow-y-auto xl:overflow-y-hidden xl:overflow-y-clip xl:overflow-y-visible
  xl:overscroll-auto xl:overscroll-contain xl:overscroll-none xl:overscroll-x-auto xl:overscroll-x-contain xl:overscroll-x-none xl:overscroll-y-auto xl:overscroll-y-contain xl:overscroll-y-none
  xl:static xl:relative xl:absolute xl:fixed xl:sticky xl:visible xl:hidden xl:collapse

  2xl:inline 2xl:block 2xl:inline-block 2xl:flow-root 2xl:flex 2xl:inline-flex 2xl:grid 2xl:inline-grid 2xl:contents 2xl:table 2xl:inline-table 2xl:table-caption 2xl:table-cell 2xl:table-column 2xl:table-column-group 2xl:table-footer-group 2xl:table-header-group 2xl:table-row-group 2xl:table-row 2xl:list-item 2xl:hidden 2xl:sr-only 2xl:not-sr-only
  2xl:overflow-auto 2xl:overflow-hidden 2xl:overflow-clip 2xl:overflow-visible 2xl:overflow-x-auto 2xl:overflow-x-hidden 2xl:overflow-x-clip 2xl:overflow-x-visible 2xl:overflow-y-auto 2xl:overflow-y-hidden 2xl:overflow-y-clip 2xl:overflow-y-visible
  2xl:overscroll-auto 2xl:overscroll-contain 2xl:overscroll-none 2xl:overscroll-x-auto 2xl:overscroll-x-contain 2xl:overscroll-x-none 2xl:overscroll-y-auto 2xl:overscroll-y-contain 2xl:overscroll-y-none
  2xl:static 2xl:relative 2xl:absolute 2xl:fixed 2xl:sticky 2xl:visible 2xl:hidden 2xl:collapse
 */
