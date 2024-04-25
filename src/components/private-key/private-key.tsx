import PrivateKeyFirstDigit from "./private-key-first-digit";
import PrivateKeyOtherDigit from "./private-key-other-digit";

type PrivateKeyProps = {
  word: string;
  position: number;
  code?: string;
};

const PrivateKey = ({ word, code, position }: PrivateKeyProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-center border border-zinc-300 rounded-xl">
        <div className="flex items-center p-4 border-r grow border-zinc-300">
          <h5 className="flex items-center justify-center grow">{position}ª</h5>
        </div>

        <PrivateKeyFirstDigit code={code} />

        <PrivateKeyOtherDigit digit={1} code={code} />

        <PrivateKeyOtherDigit digit={2} code={code} />

        <PrivateKeyOtherDigit digit={3} isLast code={code} />
      </div>

      <div className="flex justify-between">
        <p className="capitalize">{word}</p>
        <p>{code ? Number(code) : ""}</p>
      </div>
    </div>
  );
};

export default PrivateKey;
