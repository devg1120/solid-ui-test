import { readFile } from "node:fs/promises"
import path from "node:path"

import { Index } from "~/registry/__index__"

type RegistryFile = {
  path: string
  type?: string
  target?: string
  content?: string
}

type RegistryItem = {
  files?: Array<RegistryFile | string>
  [key: string]: unknown
}

function resolveRegistryFilePath(filePath: string) {
  if (path.isAbsolute(filePath)) {
    return filePath
  }

  if (filePath.startsWith("registry/")) {
    return path.join(process.cwd(), "src", filePath)
  }

  return path.join(process.cwd(), filePath)
}

async function readRegistryFileContent(filePath: string) {
  try {
    return await readFile(resolveRegistryFilePath(filePath), "utf-8")
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return undefined
    }

    throw error
  }
}

export async function getRegistryItem(name: string) {
  const item = Index[name] as RegistryItem | undefined

  if (!item) {
    return null
  }

  const files = item.files ?? []
  const filesWithContent = await Promise.all(
    files.map(async (file) => {
      const filePath = typeof file === "string" ? file : file.path
      const content = await readRegistryFileContent(filePath)

      if (typeof file === "string") {
        return { path: filePath, content }
      }

      return {
        ...file,
        content
      }
    })
  )

  return {
    ...item,
    files: filesWithContent
  }
}
