import {
  AxisTooltip,
  Chart as SolidChart,
  type AxisTooltipProps,
  type BarConfig,
  type ChartProps as SolidChartProps
} from "solid-charts"
import {
  createContext,
  createMemo,
  createUniqueId,
  For,
  mergeProps,
  Show,
  splitProps,
  useContext,
  type Component,
  type ComponentProps,
  type JSX
} from "solid-js"
import { Dynamic } from "solid-js/web"

import { cn } from "~/lib/utils"

const THEMES = {
  light: "",
  dark: ".dark"
} as const

type ChartTheme = Record<keyof typeof THEMES, string>

export type ChartConfig = Record<
  string,
  {
    label?: JSX.Element
    icon?: Component
  } & ({ color?: string; theme?: never } | { color?: never; theme: ChartTheme })
>

type ChartContextProps = {
  config: ChartConfig
  chartId: string
  data: SolidChartProps["data"]
}

const ChartContext = createContext<ChartContextProps | null>(null)

export function useChart() {
  const context = useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }

  return context
}

const sanitizeId = (value: string) => value.replace(/[^A-Za-z0-9_-]/g, "")

const RESERVED_DATA_KEYS = new Set(["fill", "stroke", "color"])

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null

const hasChartColor = (value: ChartConfig[string]) => Boolean(value.color ?? value.theme)

const requireChartConfig = (config: ChartConfig | null | undefined, componentName: string) => {
  if (!config) {
    throw new Error(
      `${componentName} must be used within a <ChartContainer /> or receive a config prop`
    )
  }

  return config
}

const inferConfigKeys = (
  config: ChartConfig,
  data: unknown,
  excludeKeys: readonly (string | undefined)[] = []
) => {
  const excludedKeys = new Set(
    excludeKeys
      .filter((key): key is string => typeof key === "string")
      .concat([...RESERVED_DATA_KEYS])
  )

  if (isRecord(data)) {
    const configKeys = Object.keys(config).filter(
      (key) => !excludedKeys.has(key) && data[key] != null
    )

    if (configKeys.length > 0) {
      return configKeys
    }

    return Object.keys(data).filter(
      (key) => !excludedKeys.has(key) && typeof data[key] === "number"
    )
  }

  const [singleKey] = Object.keys(config)

  return singleKey ? [singleKey] : []
}

const inferLabelValue = (data: unknown, itemKeys: readonly string[]) => {
  if (!isRecord(data)) {
    return data
  }

  const excludedKeys = new Set([...itemKeys, ...RESERVED_DATA_KEYS])

  for (const [key, value] of Object.entries(data)) {
    if (excludedKeys.has(key) || value == null) {
      continue
    }

    if (typeof value === "string" || typeof value === "number") {
      return value
    }
  }

  return null
}

const getDatumColor = (data: unknown) => {
  if (!isRecord(data)) {
    return undefined
  }

  if (typeof data.fill === "string") {
    return data.fill
  }

  if (typeof data.stroke === "string") {
    return data.stroke
  }

  return undefined
}

const getConfigKeyFromData = (config: ChartConfig, data: unknown, key: string) => {
  if (!isRecord(data)) {
    return key
  }

  const value = data[key]

  if (typeof value === "string" && value in config) {
    return value
  }

  return key
}

const getConfigEntry = (config: ChartConfig, data: unknown, key: string) => {
  const configKey = getConfigKeyFromData(config, data, key)

  return {
    configKey,
    entry: config[configKey] ?? config[key]
  }
}

const getDataValue = (data: unknown, key: string) => {
  if (isRecord(data)) {
    return data[key]
  }

  return data
}

const getColorCss = (attribute: string, id: string, config: ChartConfig) => {
  const colorEntries = Object.entries(config).filter(([, itemConfig]) => hasChartColor(itemConfig))

  if (colorEntries.length === 0) {
    return ""
  }

  return Object.entries(THEMES)
    .map(([theme, prefix]) => {
      const declarations = colorEntries
        .map(([key, itemConfig]) => {
          const color =
            itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ?? itemConfig.color

          return color ? `  --color-${key}: ${color};` : null
        })
        .filter((value): value is string => value !== null)
        .join("\n")

      return `${prefix} [${attribute}="${id}"] {\n${declarations}\n}`
    })
    .join("\n")
}

const formatValue = (value: unknown) => {
  if (typeof value === "number") {
    return value.toLocaleString()
  }

  return String(value)
}

export type ChartContainerProps = Omit<ComponentProps<"div">, "children"> & {
  config: ChartConfig
  data: SolidChartProps["data"]
  width?: SolidChartProps["width"]
  height?: SolidChartProps["height"]
  inset?: SolidChartProps["inset"]
  barConfig?: Partial<BarConfig>
  children: JSX.Element
}

export function ChartContainer(props: ChartContainerProps) {
  const mergedProps = mergeProps(
    {
      width: "responsive" as const,
      height: "responsive" as const,
      inset: 8 as SolidChartProps["inset"]
    },
    props
  )

  const [local, others] = splitProps(mergedProps, [
    "id",
    "class",
    "children",
    "config",
    "data",
    "width",
    "height",
    "inset",
    "barConfig"
  ])

  const uniqueId = createUniqueId()
  const chartId = () => `chart-${sanitizeId(local.id ?? uniqueId)}`

  const contextValue: ChartContextProps = {
    get config() {
      return local.config
    },
    get chartId() {
      return chartId()
    },
    get data() {
      return local.data
    }
  }

  return (
    <ChartContext.Provider value={contextValue}>
      <div
        class={cn(
          "cn-chart relative block aspect-video text-xs [&_[data-sc-axis-cursor]]:stroke-border [&_[data-sc-axis-grid]]:stroke-border/50 [&_[data-sc-axis-label]]:fill-muted-foreground [&_[data-sc-axis-line]]:stroke-border/50 [&_[data-sc-axis-mark]]:stroke-border/50 [&_[data-sc-axis-value-line]]:stroke-border/50 [&_[data-sc-chart]]:overflow-visible [&_[data-sc-point][data-active]]:stroke-background [&_[data-sc-point][data-active]]:stroke-2",
          local.class
        )}
        data-chart={chartId()}
        data-slot="chart"
        {...others}
      >
        <ChartStyle config={local.config} id={chartId()} />
        <SolidChart
          barConfig={local.barConfig}
          data={local.data}
          height={local.height}
          inset={local.inset}
          width={local.width}
        >
          {local.children}
        </SolidChart>
      </div>
    </ChartContext.Provider>
  )
}

export function ChartStyle(props: { id: string; config: ChartConfig }) {
  const css = createMemo(() => getColorCss("data-chart", props.id, props.config))

  return <Show when={css().length > 0}>{<style>{css()}</style>}</Show>
}

export type ChartTooltipProps = AxisTooltipProps

export function ChartTooltip(props: ChartTooltipProps) {
  return <AxisTooltip data-slot="chart-tooltip" {...props} />
}

export type ChartTooltipItem = {
  key: string
  configKey: string
  color: string
  icon?: Component
  label?: JSX.Element
  value: unknown
}

export type ChartTooltipContentProps = ComponentProps<"div"> & {
  data: unknown
  keys?: string[]
  labelKey?: string
  nameKey?: string
  indicator?: "dot" | "line" | "dashed"
  hideLabel?: boolean
  hideIndicator?: boolean
  color?: string
  labelClass?: string
  config?: ChartConfig
  formatter?: (item: ChartTooltipItem, index: number) => JSX.Element
  labelFormatter?: (value: unknown, data: unknown) => JSX.Element
}

export function ChartTooltipContent(props: ChartTooltipContentProps) {
  const context = useContext(ChartContext)

  const mergedProps = mergeProps(
    {
      indicator: "dot" as const,
      hideLabel: false,
      hideIndicator: false
    },
    props
  )

  const [local, others] = splitProps(mergedProps, [
    "class",
    "data",
    "keys",
    "labelKey",
    "nameKey",
    "indicator",
    "hideLabel",
    "hideIndicator",
    "color",
    "labelClass",
    "config",
    "formatter",
    "labelFormatter"
  ])

  const config = () => requireChartConfig(local.config ?? context?.config, "ChartTooltipContent")

  const resolvedKeys = createMemo(
    () => local.keys ?? inferConfigKeys(config(), local.data, [local.labelKey])
  )

  const items = createMemo(() => {
    const chartConfig = config()
    const itemKeys = resolvedKeys()
    const datumColor = local.color ?? getDatumColor(local.data)

    return itemKeys.flatMap((key) => {
      const value = getDataValue(local.data, key)

      if (value == null) {
        return []
      }

      const configLookupKey = local.nameKey && itemKeys.length === 1 ? local.nameKey : key
      const { configKey, entry } = getConfigEntry(
        chartConfig,
        configLookupKey === key ? undefined : local.data,
        configLookupKey
      )

      return [
        {
          key,
          configKey,
          color: datumColor ?? `var(--color-${configKey})`,
          icon: entry?.icon,
          label: entry?.label ?? chartConfig[key]?.label ?? configKey,
          value
        }
      ]
    })
  })

  const tooltipLabel = createMemo<JSX.Element | null>(() => {
    const itemList = items()

    if (local.hideLabel || itemList.length === 0) {
      return null
    }

    const chartConfig = config()
    const itemKeys = itemList.map((item) => item.key)
    let value: unknown = inferLabelValue(local.data, itemKeys)

    if (local.labelKey) {
      const { entry } = getConfigEntry(chartConfig, local.data, local.labelKey)
      const rawValue = getDataValue(local.data, local.labelKey)

      value = entry?.label ?? rawValue
    } else if (typeof value === "string" && value in chartConfig) {
      value = chartConfig[value]?.label ?? value
    }

    if (local.labelFormatter && value != null) {
      return (
        <div class={cn("font-medium", local.labelClass)}>
          {local.labelFormatter(value, local.data)}
        </div>
      )
    }

    if (value == null) {
      return null
    }

    return (
      <div class={cn("font-medium", local.labelClass)}>
        {typeof value === "string" || typeof value === "number" ? value : (value as JSX.Element)}
      </div>
    )
  })

  const nestLabel = () => items().length === 1 && local.indicator !== "dot"

  return (
    <Show when={items().length > 0}>
      <div
        class={cn(
          "cn-chart-tooltip cn-chart-tooltip-content grid min-w-32 items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
          local.class
        )}
        data-slot="chart-tooltip-content"
        {...others}
      >
        <Show when={!nestLabel()}>{tooltipLabel()}</Show>
        <div class="grid gap-1.5">
          <For each={items()}>
            {(item, index) => (
              <div
                class={cn(
                  "flex w-full flex-wrap items-stretch gap-2 [&>svg]:size-2.5 [&>svg]:text-muted-foreground",
                  local.indicator === "dot" && "items-center"
                )}
              >
                <Show
                  when={local.formatter}
                  fallback={
                    <>
                      {item.icon && !local.hideIndicator ? (
                        <Dynamic component={item.icon} />
                      ) : (
                        <Show when={!local.hideIndicator}>
                          <div
                            class={cn(
                              "shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)",
                              {
                                "h-2.5 w-2.5": local.indicator === "dot",
                                "w-1": local.indicator === "line",
                                "w-0 border-[1.5px] border-dashed bg-transparent":
                                  local.indicator === "dashed",
                                "my-0.5": nestLabel() && local.indicator === "dashed"
                              }
                            )}
                            style={{
                              "--color-bg": item.color,
                              "--color-border": item.color
                            }}
                          />
                        </Show>
                      )}
                      <div
                        class={cn(
                          "flex flex-1 justify-between leading-none",
                          nestLabel() ? "items-end" : "items-center"
                        )}
                      >
                        <div class="grid gap-1.5">
                          <Show when={nestLabel()}>{tooltipLabel()}</Show>
                          <span class="text-muted-foreground">{item.label}</span>
                        </div>
                        <span class="font-mono font-medium text-foreground tabular-nums">
                          {formatValue(item.value)}
                        </span>
                      </div>
                    </>
                  }
                >
                  {local.formatter?.(item, index())}
                </Show>
              </div>
            )}
          </For>
        </div>
      </div>
    </Show>
  )
}

export type ChartLegendProps = ComponentProps<"div">

export function ChartLegend(props: ChartLegendProps) {
  const [local, others] = splitProps(props, ["class", "children"])

  return (
    <div class={cn("cn-chart-legend pt-3", local.class)} data-slot="chart-legend" {...others}>
      {local.children}
    </div>
  )
}

export type ChartLegendContentProps = ComponentProps<"div"> & {
  keys?: string[]
  data?: SolidChartProps["data"]
  hideIcon?: boolean
  config?: ChartConfig
  nameKey?: string
}

export function ChartLegendContent(props: ChartLegendContentProps) {
  const context = useContext(ChartContext)

  const mergedProps = mergeProps({ hideIcon: false }, props)
  const [local, others] = splitProps(mergedProps, [
    "class",
    "keys",
    "data",
    "hideIcon",
    "config",
    "nameKey"
  ])

  const config = () => requireChartConfig(local.config ?? context?.config, "ChartLegendContent")
  const legendData = () => local.data ?? context?.data

  const resolvedKeys = createMemo(() => {
    if (local.keys?.length) {
      return local.keys
    }

    const chartConfig = config()
    const data = legendData()

    if (local.nameKey && Array.isArray(data)) {
      const nameKey = local.nameKey
      const configKeys = new Set(Object.keys(chartConfig))
      const inferredKeys = Array.from(
        new Set(
          data.flatMap((item) => {
            if (!isRecord(item)) {
              return []
            }

            const value = item[nameKey]

            return typeof value === "string" && configKeys.has(value) ? [value] : []
          })
        )
      )

      if (inferredKeys.length > 0) {
        return inferredKeys
      }
    }

    const configKeys = Object.entries(chartConfig)
      .filter(([, entry]) => hasChartColor(entry))
      .map(([key]) => key)

    return configKeys.length > 0 ? configKeys : Object.keys(chartConfig)
  })

  const items = createMemo(() => {
    const chartConfig = config()

    return resolvedKeys().map((key) => {
      const entry = chartConfig[key]

      return {
        key,
        icon: entry?.icon,
        label: entry?.label ?? key
      }
    })
  })

  const legendId = `chart-legend-${sanitizeId(createUniqueId())}`
  const css = createMemo(() => getColorCss("data-chart-legend", legendId, config()))

  return (
    <Show when={items().length > 0}>
      <div
        class={cn("cn-chart-legend-content flex items-center justify-center gap-4", local.class)}
        data-chart-legend={legendId}
        data-slot="chart-legend-content"
        {...others}
      >
        <Show when={css().length > 0}>{<style>{css()}</style>}</Show>
        <For each={items()}>
          {(item) => (
            <div class="flex items-center gap-1.5 [&>svg]:size-3 [&>svg]:text-muted-foreground">
              {item.icon && !local.hideIcon ? (
                <Dynamic component={item.icon} />
              ) : (
                <div
                  class="size-2 shrink-0 rounded-[2px]"
                  style={{ "background-color": `var(--color-${item.key})` }}
                />
              )}
              <span>{item.label}</span>
            </div>
          )}
        </For>
      </div>
    </Show>
  )
}
