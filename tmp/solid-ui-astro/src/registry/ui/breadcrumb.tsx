import {
  Link,
  Root,
  Separator,
  type BreadcrumbsLinkProps as BreadcrumbsLinkPrimitiveProps,
  type BreadcrumbsRootProps,
  type BreadcrumbsSeparatorProps as BreadcrumbsSeparatorPrimitiveProps
} from "@kobalte/core/breadcrumbs"
import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import { splitProps, type ComponentProps, type ValidComponent } from "solid-js"

import { IconPlaceholder } from "~/components/icon-placeholder"
import { cn } from "~/lib/utils"

type BreadcrumbProps<T extends ValidComponent = "nav"> = PolymorphicProps<
  T,
  BreadcrumbsRootProps<T>
> &
  Pick<ComponentProps<T>, "class">

const Breadcrumb = <T extends ValidComponent = "nav">(props: BreadcrumbProps<T>) => {
  const [local, others] = splitProps(props as BreadcrumbProps, ["class", "separator"])

  return (
    <Root
      aria-label="breadcrumb"
      class={cn("cn-breadcrumb", local.class)}
      data-slot="breadcrumb"
      separator={
        local.separator ?? (
          <IconPlaceholder
            class="cn-rtl-flip"
            lucide="ChevronRightIcon"
            tabler="IconChevronRight"
          />
        )
      }
      {...others}
    />
  )
}

type BreadcrumbListProps = ComponentProps<"ol">

const BreadcrumbList = (props: BreadcrumbListProps) => {
  const [local, others] = splitProps(props, ["class"])

  return (
    <ol
      class={cn("cn-breadcrumb-list flex flex-wrap items-center wrap-break-word", local.class)}
      data-slot="breadcrumb-list"
      {...others}
    />
  )
}

type BreadcrumbItemProps = ComponentProps<"li">

const BreadcrumbItem = (props: BreadcrumbItemProps) => {
  const [local, others] = splitProps(props, ["class"])

  return (
    <li
      class={cn("cn-breadcrumb-item inline-flex items-center", local.class)}
      data-slot="breadcrumb-item"
      {...others}
    />
  )
}

type BreadcrumbLinkProps<T extends ValidComponent = "a"> = PolymorphicProps<
  T,
  BreadcrumbsLinkPrimitiveProps<T>
> &
  Pick<ComponentProps<T>, "class">

const BreadcrumbLink = <T extends ValidComponent = "a">(props: BreadcrumbLinkProps<T>) => {
  const [local, others] = splitProps(props as BreadcrumbLinkProps, ["class"])

  return (
    <Link class={cn("cn-breadcrumb-link", local.class)} data-slot="breadcrumb-link" {...others} />
  )
}

type BreadcrumbPageProps = ComponentProps<"span">

const BreadcrumbPage = (props: BreadcrumbPageProps) => {
  const [local, others] = splitProps(props, ["class"])

  return (
    <span
      aria-current="page"
      aria-disabled="true"
      class={cn("cn-breadcrumb-page", local.class)}
      data-slot="breadcrumb-page"
      role="link"
      {...others}
    />
  )
}

type BreadcrumbSeparatorProps<T extends ValidComponent = "span"> = PolymorphicProps<
  T,
  BreadcrumbsSeparatorPrimitiveProps<T>
> &
  Pick<ComponentProps<T>, "class">

const BreadcrumbSeparator = <T extends ValidComponent = "span">(
  props: BreadcrumbSeparatorProps<T>
) => {
  const [local, others] = splitProps(props as BreadcrumbSeparatorProps, ["class"])

  return (
    <Separator
      aria-hidden="true"
      class={cn("cn-breadcrumb-separator", local.class)}
      data-slot="breadcrumb-separator"
      role="presentation"
      {...others}
    />
  )
}

type BreadcrumbEllipsisProps = ComponentProps<"span">

const BreadcrumbEllipsis = (props: BreadcrumbEllipsisProps) => {
  const [local, others] = splitProps(props, ["class"])

  return (
    <span
      aria-hidden="true"
      class={cn("cn-breadcrumb-ellipsis flex items-center justify-center", local.class)}
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      {...others}
    >
      <IconPlaceholder lucide="MoreHorizontalIcon" tabler="IconDots" />
      <span class="sr-only">More</span>
    </span>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis
}
