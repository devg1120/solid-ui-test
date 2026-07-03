import type { SourceFile } from "ts-morph"

import type { IconLibraryName } from "~/registry/icon-libraries"

export type CodeTransformerConfig = {
  iconLibrary: IconLibraryName
}

export type FormatCodeTransformer = (opts: {
  filename: string
  raw: string
  sourceFile: SourceFile
  config: CodeTransformerConfig
}) => Promise<SourceFile | void>
