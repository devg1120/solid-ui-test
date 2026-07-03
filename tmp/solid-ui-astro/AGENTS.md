# .refernces folder

a collection of all the repos that can be used to gather data / information to be able to port over primitives / examples / docs pages

## shadcn-ui

.references/shadcn-ui/apps/v4/registry/bases/radix/ui/ - here you can find the newest versions of all the primitives
.references/shadcn-ui/apps/v4/examples/radix - here you can find all the examples needed for the docs pages
.references/shadcn-ui/apps/v4/content/docs/components/radix/ - here you can find all the docs pages for the primitives

## zaidan

.references/zaidan/src/registry/kobalte/ui - here you can find all the shadcn-ui primitives that are already ported to solidjs

if you move/port over a primitive from zaidan make sure to do the following changes:

- replace all the z-_ classes with the cn-_ classes to make it align with shadcn-ui
- replace all occurences of lucide-icons with the use of @src/components/icon-placeholder.tsx like it's done in shadcn-ui
- allways port/move over the full primitive!

## solid-ui

.references/solid-ui/apps/docs/src/registry/ui - here you can find all the old solid-ui implementation (only reference them if explicitelly stated)
