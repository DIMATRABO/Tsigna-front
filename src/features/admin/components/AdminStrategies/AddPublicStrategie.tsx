import {
  Button,
  Flex,
  Group,
  Select,
  TextInput,
  Image,
  Text,
  NativeSelect,
  NumberInput,
  Switch,
  rem,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm, zodResolver } from "@mantine/form";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  PublicStratSchema,
  publicStratSchema,
} from "features/admin/schemas/strategies";
import { forwardRef, useState } from "react";
import { getAllExchanges, getAllCurrencies } from "services/exchange";
import { createPublicStrategy } from "services/strategy";
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
  const [checked, setChecked] = useState(false);
  const [exchangeId, setExchangeId] = useState<string>("");

  const form = useForm<PublicStratSchema>({
    validate: zodResolver(publicStratSchema),
  });

  const { mutate, isLoading: loadingCreation } = useMutation(
    (values: PublicStratSchema) => createPublicStrategy(values),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["strategies"]);
        notifications.show({
          title: "Success",
          message: "Strategy created successfully",
          color: "green",
        });
        modals.closeAll();
      },
      onError: (error) => {
        notifications.show({
          title: "Error",
          message: "Error creating strategy",
          color: "red",
        });
      },
    }
  );

  const { data, isLoading } = useQuery<Exchange[]>(
    ["exchanges"],
    getAllExchanges,
    {
      refetchOnWindowFocus: false,
      cacheTime: Infinity,
      staleTime: Infinity,
    }
  );

  const {
    data: currencies,
    isLoading: loadingCurrencies,
    isFetching: isFetchingSymbols,
  } = useQuery<string[]>(
    ["currencies", exchangeId],
    () => getAllCurrencies(exchangeId),
    {
      refetchOnWindowFocus: false,
      cacheTime: Infinity,
      staleTime: Infinity,
      enabled: !!exchangeId,
    }
  );

  const onSubmit = (values: PublicStratSchema) => {
    mutate(values);
  };

  console.log("form.errors", form.errors);

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
      onSubmit={form.onSubmit(onSubmit)}
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
      {loadingCurrencies && isFetchingSymbols && <div>Loading...</div>}
      {!loadingCurrencies && (
        <Select
          withAsterisk
          label="Symbol"
          placeholder="Select Symbol"
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
      <Switch
        label="Futures"
        labelPosition="left"
        size="md"
        onChange={() => {
          setChecked(!checked);
          form.setFieldValue("is_future", !checked);
        }}
        checked={checked}
      />
      {checked && (
        <NumberInput
          hideControls
          withAsterisk
          placeholder="Leverage"
          label="Leverage"
          {...form.getInputProps("leverage")}
        />
      )}
      <NumberInput
        hideControls
        withAsterisk
        placeholder="1000"
        label="Backtesting Initial Capital"
        {...form.getInputProps("backtesting_initial_capital")}
      />

      <NumberInput
        hideControls
        withAsterisk
        placeholder="1000"
        label=" Capital"
        {...form.getInputProps("capital")}
      />
      <DateInput
        withAsterisk
        label="Backtesting Start Date"
        {...form.getInputProps("backtesting_start_date")}
      />
      <DateInput
        withAsterisk
        label="Backtesting End Date"
        {...form.getInputProps("backtesting_end_date")}
      />
      <NumberInput
        hideControls
        withAsterisk
        placeholder="1000"
        label="Net Profit"
        {...form.getInputProps("net_profit")}
      />
      <NumberInput
        hideControls
        withAsterisk
        placeholder="10"
        label="Total Closed Trades"
        {...form.getInputProps("total_closed_trades")}
      />
      <NumberInput
        hideControls
        withAsterisk
        placeholder="10"
        label="Percentage Profitable"
        rightSection="%"
        {...form.getInputProps("percentage_profitable")}
      />
      <NumberInput
        hideControls
        withAsterisk
        placeholder="10"
        label="Max Drawdown"
        {...form.getInputProps("max_drawdown")}
      />

      <Button type="submit" color="violet" loading={loadingCreation}>
        Submit
      </Button>
    </form>
  );
};

export default AddPublicStrategie;
