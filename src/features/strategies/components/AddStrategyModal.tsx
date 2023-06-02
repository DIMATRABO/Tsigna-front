import {
  Button,
  NativeSelect,
  NumberInput,
  Select,
  Switch,
  Text,
  TextInput,
  rem,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useStyles } from "components/shared/styles";
import { SelectItem } from "features/wallet/components/ConnectWalletModal";
import { useState } from "react";
import { getSymbols } from "services/exchange";
import { getMyWallets } from "services/wallet";
import { IWallet } from "types/wallet";
import {
  CreateStrategySchema,
  createStrategySchema,
} from "../schemas/strategy";
import { createStrategy } from "services/strategy";
import { StrategySchema } from "types/strategy";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";

type Props = {};

const amountPair = [
  { value: "percent", label: "%" },
  { value: "usd", label: "Usd" },
];
const AddStrategyModal = ({}: Props) => {
  const [checked, setChecked] = useState(false);
  const { classes } = useStyles();
  // const [symbols, setSymbols] = useState<
  //   {
  //     label: string;
  //     value: string;
  //   }[]
  // >();
  const [isPercent, setIsPercent] = useState(true);

  const form = useForm<CreateStrategySchema>({
    validate: zodResolver(createStrategySchema),
  });
  const { data, isLoading } = useQuery<IWallet[]>(["myWallets"], getMyWallets);

  const { data: symbols, isFetching: loadingsymbols } = useQuery<
    Record<string, string>[]
  >(
    [
      "symbols",
      // data?.find((wallet) => wallet.id === form.values.account_id)?.exchange.id,
      form.values.account_id,
    ],
    () =>
      getSymbols(
        data?.find((wallet) => wallet.id === form.values.account_id)?.exchange
          .id as string | ""
      ),
    {
      onSuccess: (data) => {
        // const set = new Set<string>();
        // Object.keys(data).forEach((key) => {
        //   set.add(key);
        // });
        // setSymbols(
        //   Array.from(set).map((key) => ({
        //     label: key,
        //     // @ts-ignore
        //     value: data[key] as string,
        //   }))
        // );
      },
      refetchOnWindowFocus: false,
      cacheTime: Infinity,
      staleTime: Infinity,
      enabled:
        form.values.account_id !== undefined &&
        data?.find((wallet) => wallet.id === form.values.account_id)
          ?.exchange !== undefined,
    }
  );

  console.log("form", form.errors);

  const { mutate: mutateStrategy, isLoading: loadingCreation } = useMutation(
    (values: StrategySchema) => createStrategy(values),
    {
      onSuccess: (data) => {
        console.log("data", data);
        notifications.show({
          title: "Strategy Created",
          message: "Strategy created successfully",
          color: "green",
        });
        modals.closeAll();
      },
      onError: (error) => {
        console.log("error", error);
        notifications.show({
          title: "Error",
          message: "Error creating strategy",
          color: "red",
        });
      },
    }
  );

  const entrySelect = (
    <NativeSelect
      data={amountPair}
      value={isPercent ? "percent" : "usd"}
      onChange={(event) => {
        setIsPercent(event.currentTarget.value === "percent");
      }}
      styles={{
        input: {
          fontWeight: 500,
          width: rem(100),
        },
      }}
    />
  );

  const onSubmit = (values: CreateStrategySchema) => {
    mutateStrategy({
      is_percentage: isPercent,
      symbol_id: values.symbol,
      // @ts-ignore
      symbol:
        symbols &&
        (Object.keys(symbols).find(
          // @ts-ignore
          (key) => symbols[key] === values.symbol
        ) as string),
      account_id: values.account_id,
      capital: values.capital,
      entry_size: values.entry_size,
      leverage: values.leverage || 0,
      name: values.name,
      is_future: checked,
    });
  };

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "100%",
      }}
      onSubmit={form.onSubmit(onSubmit)}
    >
      <TextInput
        placeholder="Strategy name"
        label="Name"
        withAsterisk
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
              image: exchange.exchange.image,
            }))) ||
          []
        }
        filter={(value, item) =>
          item.value.toLowerCase().includes(value.toLowerCase().trim())
        }
        {...form.getInputProps("account_id")}
      />

      {loadingsymbols && <Text>Loading Symbols...</Text>}

      {symbols && (
        <Select
          withAsterisk
          label="Symbol"
          placeholder="Pick one"
          searchable
          nothingFound="No Symbols"
          data={Object.keys(symbols).map((key) => ({
            label: key,
            // @ts-ignore
            value: symbols[key] as string,
          }))}
          {...form.getInputProps("symbol")}
        />
      )}
      <Switch
        label="Futures"
        labelPosition="left"
        size="md"
        onChange={() => {
          setChecked(!checked);
          form.setFieldValue("futures", !checked);
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
        label="Entry Amount"
        rightSection={entrySelect}
        rightSectionWidth={92}
        {...form.getInputProps("entry_size")}
      />
      <NumberInput
        hideControls
        withAsterisk
        placeholder="1000"
        label="Initial Capital"
        {...form.getInputProps("capital")}
      />
      <Text>
        <Text size="sm" color="gray">
          2000
        </Text>
      </Text>
      <Button
        className={classes.button}
        type="submit"
        loading={loadingCreation}
      >
        Create
      </Button>
    </form>
  );
};

export default AddStrategyModal;
