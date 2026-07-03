import { SyntaxKind, type SourceFile } from "ts-morph"

import type { FormatCodeTransformer } from "~/lib/transformers/types"
import { iconLibraries, type IconLibraryName } from "~/registry/icon-libraries"

export const transformIcons: FormatCodeTransformer = async ({ sourceFile, config }) => {
  const iconLibrary = config.iconLibrary

  if (!(iconLibrary in iconLibraries)) {
    return sourceFile
  }

  const targetLibrary = iconLibrary as IconLibraryName
  const libraryConfig = iconLibraries[targetLibrary]
  const transformedIcons: string[] = []

  for (const element of sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement)) {
    if (element.getTagNameNode()?.getText() !== "IconPlaceholder") {
      continue
    }

    const libraryPropAttr = element.getAttributes().find((attr) => {
      if (attr.getKind() !== SyntaxKind.JsxAttribute) {
        return false
      }

      const jsxAttr = attr.asKindOrThrow(SyntaxKind.JsxAttribute)
      return jsxAttr.getNameNode().getText() === targetLibrary
    })

    if (!libraryPropAttr) {
      continue
    }

    const jsxIconAttr = libraryPropAttr.asKindOrThrow(SyntaxKind.JsxAttribute)
    const targetIconName = jsxIconAttr
      .getInitializer()
      ?.getText()
      .replace(/^['"]|['"]$/g, "")

    if (!targetIconName) {
      continue
    }

    if (!transformedIcons.includes(targetIconName)) {
      transformedIcons.push(targetIconName)
    }

    const usageMatch = libraryConfig.usage.match(/<(\w+)([^>]*)\s*\/>/)

    jsxIconAttr.remove()

    for (const attr of element.getAttributes()) {
      if (attr.getKind() !== SyntaxKind.JsxAttribute) {
        continue
      }

      const jsxAttr = attr.asKindOrThrow(SyntaxKind.JsxAttribute)
      const attrName = jsxAttr.getNameNode().getText()
      if (attrName in iconLibraries) {
        jsxAttr.remove()
      }
    }

    if (!usageMatch) {
      element.getTagNameNode()?.replaceWithText(targetIconName)
      continue
    }

    const [, componentName, defaultPropsStr] = usageMatch

    if (componentName === "ICON") {
      const userAttributes = element
        .getAttributes()
        .filter((attr) => {
          if (attr.getKind() !== SyntaxKind.JsxAttribute) {
            return true
          }

          const jsxAttr = attr.asKindOrThrow(SyntaxKind.JsxAttribute)
          const attrName = jsxAttr.getNameNode().getText()
          return !(attrName in iconLibraries)
        })
        .map((attr) => attr.getText())
        .join(" ")

      if (userAttributes.trim()) {
        element.replaceWithText(`<${targetIconName} ${userAttributes} />`)
      } else {
        element.getTagNameNode()?.replaceWithText(targetIconName)
      }

      continue
    }

    const existingPropNames = new Set(
      element
        .getAttributes()
        .filter((attr) => attr.getKind() === SyntaxKind.JsxAttribute)
        .map((attr) => attr.asKindOrThrow(SyntaxKind.JsxAttribute).getNameNode().getText())
    )

    const defaultPropsWithIcon = defaultPropsStr.replace(/\{ICON\}/g, `{${targetIconName}}`)
    const defaultPropsToAdd = defaultPropsWithIcon
      .trim()
      .split(/\s+(?=\w+=)/)
      .filter((prop) => prop)
      .map((prop) => {
        const propName = prop.split("=")[0]
        return propName && !existingPropNames.has(propName) ? prop : null
      })
      .filter((prop): prop is string => Boolean(prop))

    const userAttributes = element
      .getAttributes()
      .filter((attr) => {
        if (attr.getKind() !== SyntaxKind.JsxAttribute) {
          return true
        }

        const jsxAttr = attr.asKindOrThrow(SyntaxKind.JsxAttribute)
        const attrName = jsxAttr.getNameNode().getText()
        return !(attrName in iconLibraries)
      })
      .map((attr) => attr.getText())
      .join(" ")

    const allProps = [...defaultPropsToAdd, userAttributes].filter(Boolean).join(" ")
    element.replaceWithText(`<${componentName} ${allProps} />`)
  }

  for (const importDeclaration of sourceFile.getImportDeclarations() ?? []) {
    const moduleSpecifier = importDeclaration.getModuleSpecifier()?.getText()
    if (!moduleSpecifier?.includes("icon-placeholder")) {
      continue
    }

    const namedImports = importDeclaration.getNamedImports() ?? []
    const iconPlaceholderImport = namedImports.find(
      (specifier) => specifier.getName() === "IconPlaceholder"
    )

    if (iconPlaceholderImport) {
      iconPlaceholderImport.remove()
    }

    if (importDeclaration.getNamedImports()?.length === 0) {
      importDeclaration.remove()
    }
  }

  if (transformedIcons.length > 0) {
    const importStatements = libraryConfig.import.split("\n")
    const addedImports = []

    for (const importStatement of importStatements) {
      const importMatch = importStatement.match(/import\s+{([^}]+)}\s+from\s+['"]([^'"]+)['"]/)
      if (!importMatch) {
        continue
      }

      const [, importedNames, modulePath] = importMatch
      const namedImports = importedNames
        .split(",")
        .map((name) => name.trim())
        .map((name) => {
          if (name === "ICON") {
            return transformedIcons.map((icon) => ({ name: icon }))
          }

          return { name }
        })
        .flat()

      const newImport = sourceFile.addImportDeclaration({
        moduleSpecifier: modulePath,
        namedImports
      })
      addedImports.push(newImport)
    }

    if (!useSemicolon(sourceFile)) {
      for (const importDeclaration of addedImports) {
        importDeclaration.replaceWithText(importDeclaration.getText().replace(";", ""))
      }
    }
  }

  return sourceFile
}

function useSemicolon(sourceFile: SourceFile) {
  return sourceFile.getImportDeclarations()?.[0]?.getText().endsWith(";") ?? false
}
