import { Card, CardContent } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export function MainCarousel() {
  const images = [
    "https://cdn.jumpit.co.kr/lg/images/dabin_3358/20230016180011665_1557_1090.webp",
    "https://cdn.jumpit.co.kr/lg/images/jnyoon_106/20250414100440214_567_378.webp",
    "https://cdn.jumpit.co.kr/lg/images/dabin_3358/20253303153347599_597_430.webp",
    "https://cdn.jumpit.co.kr/lg/images/210217/20240829110802451_1080_790.webp",
    "https://cdn.jumpit.co.kr/lg/images/38804/20241528141511980/profile-image.webp",
  ];

  return (
    <Carousel className="w-[1160px] h-[400px] mt-[24px]">
      <CarouselContent>
        {images.map((src, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex items-center justify-center p-6 h-[400px]">
                  <img
                    src={src}
                    alt={`Carousel item ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
