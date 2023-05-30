import {
  Avatar,
  Button,
  Group,
  LoadingOverlay,
  Select,
  TextInput,
  Text,
  Image,
} from "@mantine/core";
import { useStyles } from "components/shared/styles";
import { WalletForm, walletForm } from "../schemas/wallet";
import { useForm, zodResolver } from "@mantine/form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllCurrencies, getAllExchanges } from "services/exchange";
import { Exchange } from "types/exchange";
import { forwardRef } from "react";
import { createWallet } from "services/wallet";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";

type Props = {};

interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  image: string;
  label: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
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

const ConnectWalletModal = ({}: Props) => {
  const { classes } = useStyles();
  const queryClient = useQueryClient();

  const form = useForm<WalletForm>({
    validate: zodResolver(walletForm),
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
    ["currencies", form.values.exchange_id],
    () => getAllCurrencies(form.values.exchange_id),
    {
      refetchOnWindowFocus: false,
      cacheTime: Infinity,
      staleTime: Infinity,
      enabled: !!form.values.exchange_id,
    }
  );

  const { mutate: createWalletMutation, isLoading: loadingCreateWallet } =
    useMutation((values: WalletForm) => createWallet(values), {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["myWallets"]);
        notifications.show({
          title: "Wallet Created!",
          message: "You have successfully created a wallet.",
          color: "teal",
        });
        modals.closeAll();
      },
      onError: (error) => {
        notifications.show({
          title: "Error!",
          message: "Something went wrong.",
          color: "red",
        });
      },
    });

  const onSubmit = (values: WalletForm) => {
    createWalletMutation(values);
  };

  if (isLoading) {
    return <LoadingOverlay visible />;
  }

  return (
    <form
      style={{ display: "flex", gap: "1rem", flexDirection: "column" }}
      onSubmit={form.onSubmit(onSubmit)}
    >
      <TextInput
        label="Wallet Name"
        placeholder="Wallet Name"
        {...form.getInputProps("name")}
        withAsterisk
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
        {...form.getInputProps("exchange_id")}
      />
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
          {...form.getInputProps("currency")}
        />
      )}
      <TextInput
        withAsterisk
        label="API Key"
        placeholder="API Key"
        {...form.getInputProps("api_key")}
      />
      <TextInput
        withAsterisk
        label="API Secret"
        placeholder="API Secret"
        {...form.getInputProps("secret")}
      />
      <TextInput
        label="Passphrase"
        placeholder="Passphrase"
        {...form.getInputProps("passphrase")}
      />

      <Button
        variant="light"
        color="blue"
        fullWidth
        type="submit"
        className={classes.button}
        loading={loadingCreateWallet}
      >
        Connect Wallet
      </Button>
    </form>
  );
};

export default ConnectWalletModal;
