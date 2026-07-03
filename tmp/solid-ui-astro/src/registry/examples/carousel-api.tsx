import { createEffect, createSignal, For, onCleanup } from "solid-js"

import { Card, CardContent } from "~/registry/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from "~/registry/ui/carousel"

export default function CarouselApiExample() {
  const [api, setApi] = createSignal<CarouselApi>()
  const [current, setCurrent] = createSignal(0)
  const [count, setCount] = createSignal(0)

  createEffect(() => {
    const emblaApi = api()
    if (!emblaApi) {
      return
    }

    setCount(emblaApi.scrollSnapList().length)
    setCurrent(emblaApi.selectedScrollSnap() + 1)

    const handleSelect = () => {
      setCurrent(emblaApi.selectedScrollSnap() + 1)
    }

    emblaApi.on("select", handleSelect)

    onCleanup(() => {
      emblaApi.off("select", handleSelect)
    })
  })

  return (
    <div class="mx-auto max-w-[10rem] sm:max-w-xs">
      <Carousel class="w-full max-w-xs" setApi={setApi}>
        <CarouselContent>
          <For each={Array.from({ length: 5 })}>
            {(_, index) => (
              <CarouselItem>
                <Card class="m-px">
                  <CardContent class="flex aspect-square items-center justify-center p-6">
                    <span class="text-4xl font-semibold">{index() + 1}</span>
                  </CardContent>
                </Card>
              </CarouselItem>
            )}
          </For>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div class="py-2 text-center text-sm text-muted-foreground">
        Slide {current()} of {count()}
      </div>
    </div>
  )
}
