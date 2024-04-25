import { useState, useEffect } from "react";
import bip39EnglishRaw from "@/assets/txt/bip-0039-english.txt";

export type BipCodeByWordMap = Map<string, string>;
export const useGetBipCode = () => {
  const [bipCodeByWordMap, setBipCodeByWordMap] = useState<BipCodeByWordMap>(
    new Map()
  );
  const [isLoading, setIsLoading] = useState(true);

  const addNewBipCode = (index: number, word: string) => {
    setBipCodeByWordMap(
      (map) => new Map(map.set(word, String(index + 1).padStart(4, "0")))
    );
  };

  useEffect(() => {
    fetch(bip39EnglishRaw)
      .then((r) => r.text())
      .then((text: string) => {
        text
          .split("\n")
          .map((word) => word.trim())
          .forEach((word, index) => {
            addNewBipCode(index, word);
          });
        setIsLoading(false);
      });
  }, []);

  return { bipCodeByWordMap, isLoading };
};
