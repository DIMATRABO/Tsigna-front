import {
  Button,
  Flex,
  Group,
  Select,
  TextInput,
  Image,
  Text,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  PublicStratSchema,
  publicStratSchema,
} from "features/admin/schemas/strategies";
import { forwardRef, useState } from "react";
import { getAllExchanges, getAllCurrencies } from "services/exchange";
import { Exchange } from "types/exchange";

type Props = {};

interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  image: string;
  label: string;
}

export const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ image, label, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Image src={image} width={40} height={40} radius="xl" />

        <div>
          <Text size="sm">{label}</Text>
        </div>
      </Group>
    </div>
  )
);

const AddPublicStrategie = ({}: Props) => {
  const queryClient = useQueryClient();
  const [exchangeId, setExchangeId] = useState<string>("");

  const form = useForm<PublicStratSchema>({
    validate: zodResolver(publicStratSchema),
  });

  const { data, isLoading } = useQuery<Exchange[]>(
    ["exchanges"],
    getAllExchanges,
    {
      refetchOnWindowFocus: false,
      cacheTime: Infinity,
      staleTime: Infinity,
    }
  );

  const { data: currencies, isLoading: loadingCurrencies } = useQuery<string[]>(
    ["currencies", exchangeId],
    () => getAllCurrencies(exchangeId),
    {
      refetchOnWindowFocus: false,
      cacheTime: Infinity,
      staleTime: Infinity,
      enabled: !!exchangeId,
    }
  );

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
      onSubmit={form.onSubmit((values) => console.log(values))}
    >
      <TextInput
        label="Name"
        placeholder="Name"
        {...form.getInputProps("name")}
      />
      <Select
        withAsterisk
        label="Exchange"
        itemComponent={SelectItem}
        placeholder="Select Exchange"
        dropdownPosition="bottom"
        searchable
        maxDropdownHeight={400}
        data={
          (data &&
            data?.length > 0 &&
            data?.map((exchange) => ({
              value: exchange.id,
              label: exchange.name,
              image: exchange.image,
            }))) ||
          []
        }
        filter={(value, item) =>
          item.value.toLowerCase().includes(value.toLowerCase().trim())
        }
        value={exchangeId}
        onChange={(value) => {
          setExchangeId(value as string);
          form.setFieldValue("symbol_id", value as string);
        }}
      />
      {loadingCurrencies && <div>Loading...</div>}
      {!loadingCurrencies && (
        <Select
          withAsterisk
          label="Currency"
          placeholder="Select Currency"
          data={
            (currencies &&
              currencies.length > 0 &&
              currencies.map((currency) => ({
                value: currency,
                label: currency,
              }))) ||
            []
          }
          {...form.getInputProps("symbol")}
        />
      )}
      <Button type="submit" color="violet">
        Submit
      </Button>
    </form>
  );
};

export default AddPublicStrategie;
