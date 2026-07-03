import Autoplay from "embla-carousel-autoplay"
import { For } from "solid-js"

import { Card, CardContent } from "~/registry/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "~/registry/ui/carousel"

export default function CarouselPlugin() {
  const autoplay = Autoplay({ delay: 2000, stopOnInteraction: true })

  return (
    <Carousel
      class="w-full max-w-[10rem] sm:max-w-xs"
      plugins={[autoplay]}
      onMouseEnter={() => autoplay.stop()}
      onMouseLeave={() => autoplay.reset()}
    >
      <CarouselContent>
        <For each={Array.from({ length: 5 })}>
          {(_, index) => (
            <CarouselItem>
              <div class="p-1">
                <Card>
                  <CardContent class="flex aspect-square items-center justify-center p-6">
                    <span class="text-4xl font-semibold">{index() + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          )}
        </For>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
