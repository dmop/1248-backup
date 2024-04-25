import clsx from "clsx";

type PrivateKeyOtherDigitProps = {
  code?: string;
  isLast?: boolean;
  digit: number;
};

const PrivateKeyOtherDigit = ({
  code,
  isLast = false,
  digit,
}: PrivateKeyOtherDigitProps) => {
  const digitValue = (code?.[digit] || "0") as
    | "0"
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "9";

  return (
    <div
      className={clsx("flex flex-col grow border-zinc-400", {
        "border-r-2": !isLast,
      })}
    >
      <div className="flex border-b border-zinc-300 grow">
        <p
          className={clsx(
            "flex items-center justify-center flex-1 p-2 border-r border-zinc-300 text-zinc-400",
            {
              "after:absolute after:h-3.5 after:w-3.5 after:bg-black after:rounded-full":
                ["1", "3", "5", "7", "9"].includes(digitValue),
            }
          )}
        >
          1
        </p>
        <p
          className={clsx(
            "flex items-center justify-center flex-1 p-2 border-zinc-300 text-zinc-400",
            {
              "after:absolute after:h-3.5 after:w-3.5 after:bg-black after:rounded-full":
                ["2", "3", "6", "7"].includes(digitValue),
            }
          )}
        >
          2
        </p>
      </div>

      <div className="flex border-zinc-300 grow">
        <p
          className={clsx(
            "flex items-center justify-center flex-1 p-2 border-r border-zinc-300 text-zinc-400",
            {
              "after:absolute after:h-3.5 after:w-3.5 after:bg-black after:rounded-full":
                ["4", "5", "6", "7"].includes(digitValue),
            }
          )}
        >
          4
        </p>
        <p
          className={clsx(
            "flex items-center justify-center flex-1 p-2 border-zinc-300 text-zinc-400",
            {
              "after:absolute after:h-3.5 after:w-3.5 after:bg-black after:rounded-full":
                ["8", "9"].includes(digitValue),
            }
          )}
        >
          8
        </p>
      </div>
    </div>
  );
};

export default PrivateKeyOtherDigit;
