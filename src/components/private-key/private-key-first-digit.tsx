import clsx from "clsx";

type PrivateKeyFirstDigitProps = {
  code?: string;
};

const PrivateKeyFirstDigit = ({ code }: PrivateKeyFirstDigitProps) => {
  const firstDigit = (code?.[0] || 0) as "0" | "1" | "2";

  return (
    <div className="flex flex-col justify-center border-r-2 grow border-zinc-400">
      <p
        className={clsx(
          "flex items-center justify-center flex-1 p-2 border-b border-zinc-300 text-zinc-400",
          {
            "after:absolute after:h-3.5 after:w-3.5 after:bg-black after:rounded-full":
              firstDigit === "1",
          }
        )}
      >
        1
      </p>
      <p
        className={clsx(
          "flex items-center justify-center flex-1 p-2 text-zinc-400",
          {
            "after:absolute after:h-3.5 after:w-3.5 after:bg-black after:rounded-full":
              firstDigit === "2",
          }
        )}
      >
        2
      </p>
    </div>
  );
};

export default PrivateKeyFirstDigit;
