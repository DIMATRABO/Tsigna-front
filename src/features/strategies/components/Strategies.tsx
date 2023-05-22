import {
  Avatar,
  Button,
  Flex,
  Group,
  NativeSelect,
  Select,
  Switch,
  Tabs,
  Text,
  TextInput,
  rem,
} from "@mantine/core";
import { IconMoodPin, IconSparkles } from "@tabler/icons-react";
import MyStrategies from "./MyStrategies";
import { useStyles } from "components/shared/styles";
import { modals, openModal } from "@mantine/modals";
import { forwardRef } from "react";

type Props = {};

const Strategies = ({}: Props) => {
  const { classes } = useStyles();
  const data = [
    {
      image: "https://img.icons8.com/clouds/256/000000/futurama-bender.png",
      label: "Bender Bending Rodríguez",
      value: "Bender Bending Rodríguez",
      description: "Fascinated with cooking",
    },

    {
      image: "https://img.icons8.com/clouds/256/000000/futurama-mom.png",
      label: "Carol Miller",
      value: "Carol Miller",
      description: "One of the richest people on Earth",
    },
    {
      image: "https://img.icons8.com/clouds/256/000000/homer-simpson.png",
      label: "Homer Simpson",
      value: "Homer Simpson",
      description: "Overweight, lazy, and often ignorant",
    },
    {
      image:
        "https://img.icons8.com/clouds/256/000000/spongebob-squarepants.png",
      label: "Spongebob Squarepants",
      value: "Spongebob Squarepants",
      description: "Not just a sponge",
    },
  ];

  const dataPair = [
    { value: "btc", label: "Btc/Usd" },
    { value: "usd", label: "Usd/Btc" },
  ];
  const amountPair = [
    { value: "btc", label: "Btc" },
    { value: "usd", label: "Usd" },
  ];

  interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
    image: string;
    label: string;
    description: string;
  }

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

  const select = (
    <NativeSelect
      data={dataPair}
      styles={{
        input: {
          fontWeight: 500,
          width: rem(100),
        },
      }}
    />
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

  const addStrategy = () => {
    modals.openConfirmModal({
      title: "Please confirm your action",
      size: "xl",
      closeOnConfirm: false,
      labels: { confirm: "Next modal", cancel: "Close modal" },
      children: (
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            width: "100%",
          }}
        >
          <TextInput placeholder="Your name" label="Full name" withAsterisk />
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
          <TextInput
            type="number"
            placeholder="1000"
            label="Transfer amount"
            rightSection={select}
            rightSectionWidth={92}
          />
          <Switch label="Futures" labelPosition="left" size="md" />
          <TextInput
            type="number"
            placeholder="1000"
            label="Entry Amount"
            rightSection={entrySelect}
            rightSectionWidth={92}
          />
          <TextInput type="number" placeholder="1000" label="Initial Capital" />
        </form>
      ),
      onConfirm: () =>
        modals.openConfirmModal({
          title: "This is modal at second layer",
          labels: { confirm: "Close modal", cancel: "Back" },
          closeOnConfirm: false,
          children: (
            <Text size="sm">
              When this modal is closed modals state will revert to first modal
            </Text>
          ),
          onConfirm: modals.closeAll,
        }),

      onCancel: modals.closeAll,
    });
  };

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
          <MyStrategies />
        </Tabs.Panel>

        <Tabs.Panel value="popularStrategies" pt="xs">
          Messages tab content
        </Tabs.Panel>
      </Tabs>
    </Flex>
  );
};

export default Strategies;
