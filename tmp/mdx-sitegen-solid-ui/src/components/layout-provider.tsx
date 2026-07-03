import { createContext, createSignal, useContext, type ParentProps, type Accessor } from "solid-js"

export interface LayoutConfig {
  layout?: string
  title?: string
  description?: string
  [key: string]: any
}

interface LayoutContextType {
  layoutConfig: Accessor<LayoutConfig>
  setLayoutConfig: (config: LayoutConfig) => void
}

const LayoutContext = createContext<LayoutContextType>()

export function LayoutProvider(props: ParentProps) {
  const [layoutConfig, setLayoutConfig] = createSignal<LayoutConfig>({})

  return (
    <LayoutContext.Provider value={{ layoutConfig, setLayoutConfig }}>
      {props.children}
    </LayoutContext.Provider>
  )
}

export function useLayout() {
  const context = useContext(LayoutContext)
  if (!context) {
    throw new Error("useLayout must be used within a LayoutProvider")
  }
  return context
}
