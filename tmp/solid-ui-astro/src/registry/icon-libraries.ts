export const iconLibraries = {
  lucide: {
    name: "lucide",
    title: "Lucide",
    packages: ["lucide-solid"],
    import: "import { ICON } from 'lucide-solid'",
    usage: "<ICON />",
    export: "lucide-solid"
  },
  tabler: {
    name: "tabler",
    title: "Tabler Icons",
    packages: ["@tabler/icons-solidjs"],
    import: "import { ICON } from '@tabler/icons-solidjs'",
    usage: "<ICON />",
    export: "@tabler/icons-solidjs"
  }
} as const

export type IconLibraries = typeof iconLibraries

export type IconLibrary = IconLibraries[keyof IconLibraries]

export type IconLibraryName = keyof IconLibraries
