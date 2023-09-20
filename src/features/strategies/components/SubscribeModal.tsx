import { useForm, zodResolver } from "@mantine/form";
import {
  SubscribeStrategySchema,
  subscribeStrategySchema,
} from "../schemas/strategy";
import { PublicStrat } from "types/strategy";
import { Button, LoadingOverlay, NumberInput, Select } from "@mantine/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMyWallets } from "services/wallet";
import { IWallet } from "types/wallet";
import { subscribeToStrategy } from "services/strategy";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";

type Props = {
  strategy: PublicStrat;
};

const SubscribeModal = ({ strategy }: Props) => {
  const queryClient = useQueryClient();
  const form = useForm<SubscribeStrategySchema>({
    validate: zodResolver(subscribeStrategySchema),
    // initialValues: {
    //   account_id: "",
    //   capital: 0,
    //   entry_size: 0,
    //   webhook_id: strategy.webhook_id,
    // },
  });

  const { data: wallets, isLoading: LoadingWallets } = useQuery<IWallet[]>(
    ["myWallets"],
    getMyWallets
  );

  const { mutate: subscribe, isLoading: subscribing } = useMutation(
    (values: SubscribeStrategySchema) => subscribeToStrategy(values),
    {
      onSuccess(data, variables, context) {
        notifications.show({
          title: "Success",
          message: "Successfully subscribed to strategy",
          color: "green",
        });
        queryClient.invalidateQueries([
          "subscribedStrategies",
          "publicStrategies",
          "myStrategies",
        ]);
        modals.closeAll();
      },
      onError(error, variables, context) {
        notifications.show({
          title: "Error",
          message: "Error subscribing to strategy",
          color: "red",
        });
      },
    }
  );

  const onSubmit = (values: SubscribeStrategySchema) => {
    console.log("strategy", strategy);
    subscribe({
      ...values,
      webhook_id: strategy.webhook_id,
    });
  };

  if (LoadingWallets) return <LoadingOverlay visible />;

  return (
    <form
      onSubmit={form.onSubmit(onSubmit)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      {wallets && wallets.length > 0 && (
        <Select
          label="Wallet"
          placeholder="Select wallet"
          size="md"
          data={wallets?.map((w) => ({ value: w.id, label: w.name }))}
          {...form.getInputProps("account_id")}
        />
      )}
      <NumberInput
        label="Entry Size"
        placeholder="Enter entry size"
        size="md"
        {...form.getInputProps("entry_size")}
      />
      <NumberInput
        label="Capital"
        placeholder="Enter Capital"
        size="md"
        {...form.getInputProps("capital")}
      />
      <Button type="submit" color="violet" loading={subscribing}>
        Subscribe
      </Button>
    </form>
  );
};

export default SubscribeModal;
