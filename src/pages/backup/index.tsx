import PrivateKey from "@/components/private-key/private-key";
import { Button } from "@/components/ui/button";
import { useGetBipCode } from "@/hooks/useGetBipCode";
import usePrivateKeys from "@/hooks/usePrivateKeys";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { chunked } from "@/utils";
import clsx from "clsx";
import { useEffect, useState } from "react";

const BackupPage = () => {
  const { bipCodeByWordMap } = useGetBipCode();
  const { privateKeys } = usePrivateKeys();
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

  console.log(current, count);

  return (
    <div className="container flex flex-col max-w-sm justify-between h-screen max-w-sm p-8 bg-clip-border rounded-xl mx-auto overflow-hidden rounded bg-white shadow-md md:h-[90vh] md:mt-12">
      <div className="flex flex-col gap-4">
        <h2 className="text-left">Faça seu Backup</h2>
        <p className="text-muted-foreground">
          Anote as suas chaves privadas e salve-as de forma segura.
        </p>

        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
          }}
          orientation="vertical"
          className="w-full "
        >
          <CarouselContent className="h-[530px]">
            {chunked(privateKeys, 4).map((chunkedWords, index) => {
              return (
                <div key={chunkedWords[0]}>
                  {chunkedWords[0] ? (
                    <CarouselItem>
                      <PrivateKey
                        word={chunkedWords[0]}
                        code={bipCodeByWordMap.get(chunkedWords[0])!}
                        position={index + 1}
                      />
                    </CarouselItem>
                  ) : null}
                  {chunkedWords[1] ? (
                    <CarouselItem>
                      <PrivateKey
                        word={chunkedWords[1]}
                        code={bipCodeByWordMap.get(chunkedWords[1])!}
                        position={index + 2}
                      />
                    </CarouselItem>
                  ) : null}
                  {chunkedWords[2] ? (
                    <CarouselItem>
                      <PrivateKey
                        word={chunkedWords[2]}
                        code={bipCodeByWordMap.get(chunkedWords[2])!}
                        position={index + 3}
                      />
                    </CarouselItem>
                  ) : null}
                  {chunkedWords[3] ? (
                    <CarouselItem>
                      <PrivateKey
                        word={chunkedWords[3]}
                        code={bipCodeByWordMap.get(chunkedWords[3])!}
                        position={index + 4}
                      />
                    </CarouselItem>
                  ) : null}
                </div>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="flex flex-row items-center justify-center gap-6">
        {[...Array(count)].map((_, index) => (
          <div
            key={index}
            className={clsx(
              "after:absolute after:h-3 after:w-3 after:rounded-full",
              {
                "after:bg-black": index + 1 === current,
                "after:bg-zinc-400": index + 1 !== current,
              }
            )}
          />
        ))}
      </div>

      <div className="flex flex-col justify-between gap-6 mt-6">
        <Button
          className=""
          onClick={() => api?.scrollNext()}
          disabled={current === count}
        >
          <div className="flex items-center gap-2">
            Avançar
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default BackupPage;
