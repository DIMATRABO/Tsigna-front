import {
  ActionIcon,
  Avatar,
  Button,
  CopyButton,
  Flex,
  Group,
  NativeSelect,
  Select,
  Switch,
  Tabs,
  Text,
  TextInput,
  Tooltip,
  rem,
} from "@mantine/core";
import {
  IconCheck,
  IconCoin,
  IconCoinBitcoin,
  IconCopy,
  IconMoodPin,
  IconSparkles,
} from "@tabler/icons-react";
import MyStrategies from "./MyStrategies";
import { useStyles } from "components/shared/styles";
import { modals, openModal } from "@mantine/modals";
import { forwardRef } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type Props = {};
const data = [
  {
    image: "/binance.jpg",
    label: "Binance",
    value: "Binance",
    description: "The largest cryptocurrency exchange",
  },

  {
    image: "bybit.png",
    label: "Bybit",
    value: "Bybit",
    description: "The safest, fastest, most transparent, and user friendly",
  },
  {
    image: "kucoin.png",
    label: "Kucoin",
    value: "Kucoin",
    description: "The most advanced cryptocurrency exchange",
  },
];
const dataPair = [
  { value: "btc", label: "Btc/Usd" },
  { value: "usd", label: "Usd/Btc" },
];
const amountPair = [
  { value: "percent", label: "%" },
  { value: "usd", label: "Usd" },
];

interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  image: string;
  label: string;
  description: string;
}

const Strategies = ({}: Props) => {
  const [checked, setChecked] = useState(true);
  const { classes } = useStyles();

  const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
    ({ image, label, description, ...others }: ItemProps, ref) => (
      <div ref={ref} {...others}>
        <Group noWrap>
          <Avatar src={image} />

          <div>
            <Text size="sm">{label}</Text>
            <Text size="xs" opacity={0.65}>
              {description}
            </Text>
          </div>
        </Group>
      </div>
    )
  );

  const entrySelect = (
    <NativeSelect
      data={amountPair}
      styles={{
        input: {
          fontWeight: 500,
          width: rem(100),
        },
      }}
    />
  );

  const addStrategy = () =>
    modals.openConfirmModal({
      title: "Please confirm your action",
      size: "xl",
      closeOnConfirm: false,
      labels: { confirm: "Next", cancel: "Close" },
      children: (
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            width: "100%",
          }}
        >
          <TextInput placeholder="Strategy name" label="Name" />
          <Select
            label="Exchange"
            placeholder="Pick one"
            itemComponent={SelectItem}
            data={data}
            searchable
            maxDropdownHeight={400}
            dropdownPosition="bottom"
            nothingFound="Nobody here"
            filter={(value, item) =>
              item.description
                .toLowerCase()
                .includes(value.toLowerCase().trim())
            }
          />

          <Flex direction="row" gap="md">
            <Select
              label="From"
              placeholder="Pick one"
              searchable
              nothingFound="No options"
              data={["Btc", "Usd", "Eth"]}
              sx={{
                flex: 1,
              }}
            />
            <Select
              label="To"
              placeholder="Pick one"
              searchable
              nothingFound="No options"
              data={["Btc", "Usd", "Eth"]}
              sx={{
                flex: 1,
              }}
            />
          </Flex>
          <Switch
            label="Futures"
            labelPosition="left"
            size="md"
            onChange={() => setChecked(!checked)}
            checked={checked}
          />
          <TextInput
            placeholder="Leverage"
            label="Leverage"
            sx={{
              display: checked ? "block" : "none",
            }}
          />
          <TextInput
            type="number"
            placeholder="1000"
            label="Entry Amount"
            rightSection={entrySelect}
            rightSectionWidth={92}
          />
          <TextInput type="number" placeholder="1000" label="Initial Capital" />
          <Text>
            <Text size="sm" color="gray">
              2000
            </Text>
          </Text>
        </form>
      ),
      onConfirm: () =>
        modals.openConfirmModal({
          title: "This is modal at second layer",
          labels: { confirm: "Close", cancel: "Back" },
          closeOnConfirm: false,
          children: (
            <>
              <TextInput
                placeholder="Webhook url"
                label="webhook url"
                defaultValue={"https://truesignal.com/strategies/123456788"}
                rightSection={
                  <CopyButton value="copied" timeout={2000}>
                    {({ copied, copy }) => (
                      <Tooltip
                        label={copied ? "Copied" : "Copy"}
                        withArrow
                        position="right"
                      >
                        <ActionIcon
                          color={copied ? "teal" : "gray"}
                          onClick={copy}
                        >
                          {copied ? (
                            <IconCheck size="1rem" />
                          ) : (
                            <IconCopy size="1rem" />
                          )}
                        </ActionIcon>
                      </Tooltip>
                    )}
                  </CopyButton>
                }
              />
              <TextInput
                placeholder="Key"
                label="Key"
                defaultValue={"Axmklj87jjh12eedERbJ78eA32lkjn5431aez"}
                rightSection={
                  <CopyButton value="copied" timeout={2000}>
                    {({ copied, copy }) => (
                      <Tooltip
                        label={copied ? "Copied" : "Copy"}
                        withArrow
                        position="right"
                      >
                        <ActionIcon
                          color={copied ? "teal" : "gray"}
                          onClick={copy}
                        >
                          {copied ? (
                            <IconCheck size="1rem" />
                          ) : (
                            <IconCopy size="1rem" />
                          )}
                        </ActionIcon>
                      </Tooltip>
                    )}
                  </CopyButton>
                }
              />
            </>
          ),
          onConfirm: modals.closeAll,
        }),

      onCancel: modals.closeAll,
    });

  return (
    <Flex direction="column">
      <Button
        my={10}
        className={classes.button}
        sx={{
          alignSelf: "flex-end",
        }}
        onClick={addStrategy}
      >
        Connect new strategy
      </Button>
      <Tabs defaultValue="myStrategies">
        <Tabs.List>
          <Tabs.Tab value="myStrategies" icon={<IconMoodPin size="0.8rem" />}>
            My strategies
          </Tabs.Tab>
          <Tabs.Tab
            value="popularStrategies"
            icon={<IconSparkles size="0.8rem" />}
          >
            Popular strategies
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="myStrategies" pt="xs">
          <MyStrategies stratNumber={4} />
        </Tabs.Panel>

        <Tabs.Panel value="popularStrategies" pt="xs">
          <MyStrategies stratNumber={8} />
        </Tabs.Panel>
      </Tabs>
    </Flex>
  );
};

export default Strategies;
