## Primitives

- only export the types that the shadcn-ui version also exports

- if `splitProps` is needed make sure to split it into `[local, others]`
- if `splitProps` is used make sure that `props` is not called anywhere afterwards
- if `mergeProps` is needed make sure the naming is as following:

```tsx
function Component(props: Props) {
    const mergedProps = mergeProps({someDefault: true}, props)
    const [local, others] = splitProps(mergedProps, ["someDefault"])
}

```

- make sure dynamic components in the shadcn-ui are also dynamic in the port

## Docs Pages

## ALL! \_registry.ts files

- make sure the dependencies, registryDependencies arrays reflect the actual needed dependencies (make sure nothing is forgotten and nothing is unecessary present)

## Website/Documentation

- search command should always highlight first match automatically like the shadcn-ui version does (cmdk specific feature not present in kobalt/search?)
