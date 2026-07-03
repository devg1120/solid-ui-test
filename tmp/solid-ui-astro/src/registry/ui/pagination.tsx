import { mergeProps, splitProps, type ComponentProps } from "solid-js"

import { IconPlaceholder } from "~/components/icon-placeholder"
import { cn } from "~/lib/utils"
import { Button, type ButtonProps } from "~/registry/ui/button"

type PaginationProps = ComponentProps<"nav">

const Pagination = (props: PaginationProps) => {
  const [local, others] = splitProps(props, ["class"])

  return (
    <nav
      aria-label="pagination"
      data-slot="pagination"
      class={cn("cn-pagination mx-auto flex w-full justify-center", local.class)}
      {...others}
    />
  )
}

type PaginationContentProps = ComponentProps<"ul">

const PaginationContent = (props: PaginationContentProps) => {
  const [local, others] = splitProps(props, ["class"])

  return (
    <ul
      data-slot="pagination-content"
      class={cn("cn-pagination-content flex items-center", local.class)}
      {...others}
    />
  )
}

type PaginationItemProps = ComponentProps<"li">

const PaginationItem = (props: PaginationItemProps) => {
  return <li data-slot="pagination-item" {...props} />
}

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<ButtonProps, "size"> &
  ComponentProps<"a">

const PaginationLink = (rawProps: PaginationLinkProps) => {
  const props = mergeProps({ size: "icon" as const }, rawProps)
  const [local, others] = splitProps(props, ["class", "isActive", "size"])

  return (
    <Button
      as="a"
      variant={local.isActive ? "outline" : "ghost"}
      size={local.size}
      class={cn("cn-pagination-link", local.class)}
      aria-current={local.isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={local.isActive}
      {...others}
    />
  )
}

type PaginationPreviousProps = ComponentProps<typeof PaginationLink>

const PaginationPrevious = (props: PaginationPreviousProps) => {
  const [local, others] = splitProps(props, ["class", "children"])

  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      class={cn("cn-pagination-previous", local.class)}
      {...others}
    >
      <IconPlaceholder lucide="ChevronLeftIcon" tabler="IconChevronLeft" data-icon="inline-start" />
      <span class="cn-pagination-previous-text hidden sm:block">Previous</span>
    </PaginationLink>
  )
}

type PaginationNextProps = ComponentProps<typeof PaginationLink>

const PaginationNext = (props: PaginationNextProps) => {
  const [local, others] = splitProps(props, ["class", "children"])

  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      class={cn("cn-pagination-next", local.class)}
      {...others}
    >
      <span class="cn-pagination-next-text hidden sm:block">Next</span>
      <IconPlaceholder lucide="ChevronRightIcon" tabler="IconChevronRight" data-icon="inline-end" />
    </PaginationLink>
  )
}

type PaginationEllipsisProps = ComponentProps<"span">

const PaginationEllipsis = (props: PaginationEllipsisProps) => {
  const [local, others] = splitProps(props, ["class"])

  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      class={cn("cn-pagination-ellipsis flex items-center justify-center", local.class)}
      {...others}
    >
      <IconPlaceholder lucide="Ellipsis" tabler="IconDots" />
      <span class="sr-only">More pages</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  type PaginationLinkProps
}
