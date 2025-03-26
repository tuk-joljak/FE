import { Card, CardContent } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";

export function MainCarousel() {
  const images = [
    {
      src: "https://cdn.jumpit.co.kr/lg/images/dabin_3358/20230016180011665_1557_1090.webp",
      title: "프론트엔드 개발자 채용",
      description: "최고의 프론트엔드 개발자와 함께하세요",
    },
    {
      src: "https://cdn.jumpit.co.kr/lg/images/jnyoon_106/20250414100440214_567_378.webp",
      title: "백엔드 개발자 채용",
      description: "안정적인 백엔드 시스템을 구축하세요",
    },
    {
      src: "https://cdn.jumpit.co.kr/lg/images/dabin_3358/20253303153347599_597_430.webp",
      title: "데이터 엔지니어 채용",
      description: "빅데이터 시대의 핵심 인재가 되세요",
    },
    {
      src: "https://cdn.jumpit.co.kr/lg/images/210217/20240829110802451_1080_790.webp",
      title: "DevOps 엔지니어 채용",
      description: "클라우드 인프라를 구축하고 관리하세요",
    },
    {
      src: "https://cdn.jumpit.co.kr/lg/images/38804/20241528141511980/profile-image.webp",
      title: "AI/ML 엔지니어 채용",
      description: "인공지능의 미래를 함께 만들어가세요",
    },
  ];

  return (
    <Carousel className="w-full max-w-5xl mx-auto">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="p-1"
            >
              <Card className="overflow-hidden">
                <CardContent className="relative p-0">
                  <div className="relative h-[400px]">
                    <img
                      src={image.src}
                      alt={image.title}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">{image.title}</h3>
                      <p className="text-gray-200">{image.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4" />
      <CarouselNext className="right-4" />
    </Carousel>
  );
}
