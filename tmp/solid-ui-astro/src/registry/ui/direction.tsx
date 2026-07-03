import { getReadingDirection, I18nProvider, useLocale, type Direction } from "@kobalte/core/i18n"
import { createContext, splitProps, useContext, type Accessor, type JSX } from "solid-js"

type DirectionProviderProps = {
  children: JSX.Element
  direction?: Direction
  locale?: string
}

const DEFAULT_LTR_LOCALE = "en-US"
const DEFAULT_RTL_LOCALE = "ar"

const DirectionContext = createContext<() => Direction>()

const DirectionProvider = (props: DirectionProviderProps) => {
  const [local] = splitProps(props, ["children", "direction", "locale"])
  const direction = () =>
    local.direction ?? (local.locale ? getReadingDirection(local.locale) : "ltr")
  const locale = () =>
    local.locale ?? (direction() === "rtl" ? DEFAULT_RTL_LOCALE : DEFAULT_LTR_LOCALE)

  return (
    <DirectionContext.Provider value={direction}>
      <I18nProvider locale={locale()}>{local.children}</I18nProvider>
    </DirectionContext.Provider>
  )
}

const useDirection = (): Accessor<Direction> => {
  const direction = useContext(DirectionContext)
  if (direction) {
    return direction
  }

  return useLocale().direction
}

export { DirectionProvider, type Direction, type DirectionProviderProps, useDirection }
