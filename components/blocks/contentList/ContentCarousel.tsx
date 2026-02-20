'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel';

export type ContentCarouselProps = {};

export default function ContentCarousel(props: ContentCarouselProps) {
  return (
    <Carousel>
      <CarouselContent>
        <CarouselItem className="aspect-3/4 basis-full md:basis-sm">
          <div className="w-full h-full bg-primary rounded-2xl"></div>
        </CarouselItem>
        <CarouselItem className="aspect-3/4 basis-full md:basis-sm">
          <div className="w-full h-full bg-primary rounded-2xl"></div>
        </CarouselItem>
        <CarouselItem className="aspect-3/4 basis-full md:basis-sm">
          <div className="w-full h-full bg-primary rounded-2xl"></div>
        </CarouselItem>
        <CarouselItem className="aspect-3/4 basis-full md:basis-sm">
          <div className="w-full h-full bg-primary rounded-2xl"></div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}
