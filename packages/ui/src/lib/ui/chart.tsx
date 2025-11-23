import { createContext, useContext, useId, useMemo } from 'react';
import {
  Legend,
  type LegendPayload,
  type LegendProps,
  ResponsiveContainer,
  Tooltip,
  type TooltipContentProps,
} from 'recharts';
import {
  type NameType,
  type ValueType,
} from 'recharts/types/component/DefaultTooltipContent';

import { cn } from '@veraclins-dev/utils';

import { type BoxVariants } from './utils/variants';
import { Box } from './box';
import { Typography } from './typography';

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: '', dark: '.dark' } as const;

/**
 * A component that generates CSS styles for chart theming based on the provided configuration.
 * @param props - The component props.
 * @param props.id - A unique identifier for the chart.
 * @param props.config - The chart configuration object defining colors or themes for chart elements.
 * @returns A style element with dynamic CSS for chart theming, or null if no color configuration is provided.
 */
const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([_, config]) => config.theme || config.color,
  );

  if (!colorConfig.length) {
    return null;
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
						${prefix} [data-chart=${id}] {
						${colorConfig
              .map(([key, itemConfig]) => {
                const color =
                  itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ??
                  itemConfig.color;
                return color ? `  --color-${key}: ${color};` : null;
              })
              .join('\n')}
						}
						`,
          )
          .join('\n'),
      }}
    />
  );
};

/**
 * Configuration type for chart styling and behavior.
 * @typedef {Object.<string, ChartConfigItem>} ChartConfig
 * @property {React.ReactNode} [label] - Optional label for the chart element.
 * @property {React.ComponentType} [icon] - Optional icon component for the chart element.
 * @property {string} [color] - A single color for the chart element (mutually exclusive with theme).
 * @property {Record<keyof typeof THEMES, string>} [theme] - Theme-specific colors for the chart element (mutually exclusive with color).
 */
export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  );
};

/**
 * Context for sharing chart configuration across components.
 * @typedef {Object} ChartContextProps
 * @property {ChartConfig} config - The chart configuration object.
 */
type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = createContext<ChartContextProps | null>(null);

/**
 * Hook to access chart configuration from the ChartContext.
 * @returns The chart configuration context.
 * @throws {Error} If used outside of a ChartContainer.
 */
function useChart() {
  const context = useContext(ChartContext);

  if (!context) {
    throw new Error('useChart must be used within a <ChartContainer />');
  }

  return context;
}

/**
 * A container component for rendering charts with theming and responsive behavior.
 * This component wraps Recharts components and applies styles based on the provided configuration.
 * @param props - The component props.
 * @param props.id - Optional unique identifier for the chart. If not provided, a unique ID is generated.
 * @param props.className - Optional CSS class names to apply to the container.
 * @param props.config - The chart configuration object for styling and theming.
 * @param props.children - The chart components to render, typically Recharts components.
 * @param props - Additional props passed to the underlying div element.
 * @returns A styled chart container with responsive chart content.
 */
function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}: React.ComponentProps<typeof Box> & {
  config: ChartConfig;
  children: React.ComponentProps<typeof ResponsiveContainer>['children'];
}) {
  const uniqueId = useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, '')}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <Box
        data-slot="chart"
        data-chart={chartId}
        className={cn(
          "[&_.recharts-cartesian-axis-tick_text]:fill-neutral-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-neutral [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-neutral [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border flex aspect-video justify-center text-xs [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
          className,
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <ResponsiveContainer initialDimension={{ width: 320, height: 250 }}>
          {children}
        </ResponsiveContainer>
      </Box>
    </ChartContext.Provider>
  );
}

/**
 * A wrapper for the Recharts Tooltip component.
 * @type {typeof Tooltip}
 */
const ChartTooltip = Tooltip;

/**
 * A component for rendering custom tooltip content for charts.
 * This component displays formatted data from the chart payload, with optional indicators and labels.
 * @param props - The component props.
 * @param props.active - Whether the tooltip is active (visible).
 * @param props.payload - The data payload for the tooltip.
 * @param props.className - Optional CSS class names for the tooltip container.
 * @param props.indicator - The type of indicator to display ('dot', 'line', or 'dashed'). Defaults to 'dot'.
 * @param props.hideLabel - Whether to hide the tooltip label. Defaults to false.
 * @param props.hideIndicator - Whether to hide the indicator. Defaults to false.
 * @param props.label - The label for the tooltip.
 * @param props.labelFormatter - Optional function to format the tooltip label.
 * @param props.labelClassName - Optional CSS class names for the label.
 * @param props.formatter - Optional function to format the tooltip value.
 * @param props.color - Optional custom color for the indicator.
 * @param props.nameKey - Optional key to identify the name in the payload.
 * @param props.labelKey - Optional key to identify the label in the payload.
 * @param props.footer - Optional footer content to display below the tooltip items.
 * @returns A styled tooltip with formatted content, or null if not active or no payload.
 */
function ChartTooltipContent<TValue extends ValueType, TName extends NameType>({
  active,
  payload,
  className,
  indicator = 'dot',
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey,
  footer,
}: TooltipContentProps<TValue, TName> &
  Omit<React.ComponentProps<typeof Box>, 'content' | 'position'> & {
    hideLabel?: boolean;
    hideIndicator?: boolean;
    indicator?: 'line' | 'dot' | 'dashed';
    nameKey?: string;
    labelKey?: string;
    footer?: React.ReactNode;
  }) {
  const { config } = useChart();

  const tooltipLabel = useMemo(() => {
    if (hideLabel || !payload?.length) {
      return null;
    }

    const [item] = payload;
    const key = `${labelKey ?? item?.dataKey ?? item?.name ?? 'value'}`;
    const itemConfig = getPayloadConfigFromPayload(config, item, key);
    const value =
      !labelKey && typeof label === 'string'
        ? (config[label as keyof typeof config]?.label ?? label)
        : itemConfig?.label;

    if (labelFormatter) {
      return (
        <Box className={cn('font-medium', labelClassName)}>
          {labelFormatter(value, payload)}
        </Box>
      );
    }

    if (!value) {
      return null;
    }

    return <Box className={cn('font-medium', labelClassName)}>{value}</Box>;
  }, [
    label,
    labelFormatter,
    payload,
    hideLabel,
    labelClassName,
    config,
    labelKey,
  ]);

  if (!active || !payload?.length) {
    return null;
  }

  const nestLabel = payload.length === 1 && indicator !== 'dot';

  return (
    <Box
      className={cn(
        'border-foreground/50 bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl',
        className,
      )}
    >
      {!nestLabel ? tooltipLabel : null}
      <Box className="grid gap-1.5">
        {payload.map((item, index) => {
          const key = `${nameKey || item.name || item.dataKey || 'value'}`;
          const itemConfig = getPayloadConfigFromPayload(config, item, key);
          const indicatorColor = color || item.payload.fill || item.color;

          return (
            <Box
              key={item.dataKey}
              className={cn(
                '[&>svg]:text-neutral-foreground flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5',
                indicator === 'dot' && 'items-center',
              )}
            >
              {formatter && item?.value !== undefined && item.name ? (
                formatter(item.value, item.name, item, index, item.payload)
              ) : (
                <>
                  {itemConfig?.icon ? (
                    <itemConfig.icon />
                  ) : (
                    !hideIndicator && (
                      <Box
                        className={cn(
                          'shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)',
                          {
                            'h-2.5 w-2.5': indicator === 'dot',
                            'w-1': indicator === 'line',
                            'w-0 border-[1.5px] border-dashed bg-transparent':
                              indicator === 'dashed',
                            'my-0.5': nestLabel && indicator === 'dashed',
                          },
                        )}
                        style={
                          {
                            '--color-bg': indicatorColor,
                            '--color-border': indicatorColor,
                          } as React.CSSProperties
                        }
                      />
                    )
                  )}
                  <Box
                    display="flex"
                    flex="1"
                    justify="between"
                    gap={2}
                    items={nestLabel ? 'end' : 'center'}
                    className="leading-none"
                  >
                    <Box display="grid" className=" gap-1.5">
                      {nestLabel ? tooltipLabel : null}
                      <Typography className="text-neutral-foreground">
                        {itemConfig?.label || item.name}
                      </Typography>
                    </Box>
                    {item.value && (
                      <span className="text-foreground font-mono font-medium tabular-nums">
                        {item.value.toLocaleString()}
                      </span>
                    )}
                  </Box>
                </>
              )}
            </Box>
          );
        })}
      </Box>
      {footer && (
        <Box className="mt-2 -mx-2.5 px-2.5 pt-2 border-t border-foreground/50">
          {footer}
        </Box>
      )}
    </Box>
  );
}

/**
 * A wrapper for the Recharts Legend component.
 * @type {typeof Legend}
 */
const ChartLegend = Legend;

/**
 * A component for rendering custom legend content for charts.
 * This component displays a list of legend items based on the provided payload, with optional icons or color indicators.
 * @param props - The component props.
 * @param props.className - Optional CSS class names for the legend container.
 * @param props.hideIcon - Whether to hide the icon or color indicator. Defaults to false.
 * @param props.payload - The data payload for the legend.
 * @param props.verticalAlign - The vertical alignment of the legend ('top' or 'bottom'). Defaults to 'bottom'.
 * @param props.nameKey - Optional key to identify the name in the payload.
 * @returns A styled legend with formatted content, or null if no payload.
 */
function ChartLegendContent({
  className,
  hideIcon = false,
  payload,
  verticalAlign = 'bottom',
  nameKey,
}: BoxVariants &
  LegendProps & {
    hideIcon?: boolean;
    nameKey?: string;
    payload?: Readonly<LegendPayload[]>;
    className?: string;
  }) {
  const { config } = useChart();

  if (!payload?.length) {
    return null;
  }

  return (
    <Box
      display="flex"
      items="center"
      justify="center"
      gap={4}
      className={cn(verticalAlign === 'top' ? 'pb-3' : 'pt-3', className)}
    >
      {payload.map((item) => {
        const key = `${nameKey || item.dataKey || 'value'}`;
        const itemConfig = getPayloadConfigFromPayload(config, item, key);

        return (
          <Box
            key={item.value}
            className={cn(
              '[&>svg]:text-neutral-foreground flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3',
            )}
          >
            {itemConfig?.icon && !hideIcon ? (
              <itemConfig.icon />
            ) : (
              <Box
                className="h-2 w-2 shrink-0 rounded-[2px]"
                style={{
                  backgroundColor: item.color,
                }}
              />
            )}
            {itemConfig?.label}
          </Box>
        );
      })}
    </Box>
  );
}

/**
 * Helper function to extract configuration for a chart item from the payload.
 *
 * @param config - The chart configuration object.
 * @param payload - The data payload for the chart item.
 * @param key - The key to identify the item in the configuration.
 * @returns The configuration for the specified item, or undefined if not found.
 */
function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string,
) {
  if (typeof payload !== 'object' || payload === null) {
    return undefined;
  }

  const payloadPayload =
    'payload' in payload &&
    typeof payload.payload === 'object' &&
    payload.payload !== null
      ? payload.payload
      : undefined;

  let configLabelKey: string = key;

  if (
    key in payload &&
    typeof payload[key as keyof typeof payload] === 'string'
  ) {
    configLabelKey = payload[key as keyof typeof payload] as string;
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === 'string'
  ) {
    configLabelKey = payloadPayload[
      key as keyof typeof payloadPayload
    ] as string;
  }

  return configLabelKey in config
    ? config[configLabelKey]
    : config[key as keyof typeof config];
}

export {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
};
