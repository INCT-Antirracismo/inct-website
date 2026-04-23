"use client";

import {
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import DefaultCTA, { DefaultCTAProps } from "./DefaultCTA";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export type CarouselCTABlockProps = {
  autoplay: boolean;
  height: "full" | "80" | "50";
  items: DefaultCTAProps[];
};

export default function CarouselCTABlock(props: CarouselCTABlockProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      plugins={
        props.autoplay
          ? [
              Autoplay({
                delay: 5000,
              }),
            ]
          : []
      }
      opts={{ loop: true }}
      className="relative"
    >
      <CarouselContent>
        {props.items.map((item) => {
          item.height = props.height;
          return (
            <CarouselItem key={item.id}>
              <DefaultCTA {...item} />
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <div className="absolute z-5 flex items-center justify-center w-fit bottom-3 left-1/2 -translate-x-1/2">
        {props.items.map((item, index) => {
          return (
            <div
              key={"dot" + item.id}
              className="p-3 group cursor-pointer"
              onClick={() => api?.scrollTo(index)}
            >
              <div
                className={cn(
                  "size-2.5 bg-white border-2 rounded-full group-hover:bg-sun",
                  index === current - 1 && "bg-trinidad!",
                )}
              ></div>
            </div>
          );
        })}
      </div>
      <CarouselNext className="right-5 bg-background hover:bg-muted hidden md:flex" />
      <CarouselPrevious className="left-5 bg-background hover:bg-muted hidden md:flex" />
    </Carousel>
  );
}
