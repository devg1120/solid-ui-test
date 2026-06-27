declare module '*.mdx' {
  let MDXComponent: (props: any) => import('solid-js').JSX.Element;
  export default MDXComponent;
}

