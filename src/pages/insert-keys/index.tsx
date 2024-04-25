import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetBipCode } from "@/hooks/useGetBipCode";
import usePrivateKeys from "@/hooks/usePrivateKeys";

const FormSchema = z.object({
  privateKeys: z
    .string({
      required_error: "Chaves privadas devem ser informadas.",
    })
    .refine((val) => val.trim().length > 0, {
      message: "Chaves privadas devem ser informadas.",
    })
    .refine(
      (val) =>
        val.trim().split(" ").length === 12 ||
        val.trim().split(" ").length === 24,
      {
        message: "Chaves privadas devem ter 12 ou 24 palavras.",
      }
    ),
});

const InsertKeysPage = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const { bipCodeByWordMap } = useGetBipCode();
  const { setPrivateKeys } = usePrivateKeys();
  const navigate = useNavigate();

  function handleSubmit(data: z.infer<typeof FormSchema>) {
    console.log(JSON.stringify(data, null, 2));

    const allWordsAreValid = data.privateKeys
      .trim()
      .split(" ")
      .every((word) => {
        return bipCodeByWordMap.has(word);
      });

    if (!allWordsAreValid) {
      form.setError("privateKeys", {
        type: "custom",
        message: "Todas as chaves privadas devem ser válidas.",
      });
      return;
    }

    setPrivateKeys(data.privateKeys.trim().split(" "));
    navigate("/backup");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="container flex flex-col max-w-sm justify-between h-screen p-8 bg-clip-border rounded-xl mx-auto overflow-hidden rounded bg-white shadow-md md:h-[90vh] md:mt-12"
      >
        <div className="flex flex-col gap-4">
          <h2 className="text-left">Insira suas chaves privadas</h2>
          <p className="text-muted-foreground">
            Insira suas chaves privadas, para que possamos gerar seu backup.
          </p>

          <FormField
            control={form.control}
            name="privateKeys"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Chaves privadas</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Insira aqui suas chaves privadas separadas por espaços."
                    className="h-64 mt-8 resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Você pode inserir um conjunto de 12 ou 24 palavras seguindo o
                  padrão BIP39 em inglês.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button className="w-full">
          <div className="flex items-center gap-2">
            Próxima página
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
      </form>
    </Form>
  );
};

export default InsertKeysPage;
