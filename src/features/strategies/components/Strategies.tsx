import { Button, Flex, Tabs } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconMoodPin, IconSparkles } from "@tabler/icons-react";
import { useStyles } from "components/shared/styles";
import AddStrategyModal from "./AddStrategyModal";
import ApiKeyModal from "./ApiKeyModal";
import MyStrategies from "./MyStrategies";

type Props = {};

const Strategies = ({}: Props) => {
  const { classes } = useStyles();

  const openApiKeysModal = () =>
    modals.openConfirmModal({
      title: "This is modal at second layer",
      labels: { confirm: "Close", cancel: "Back" },
      closeOnConfirm: false,
      children: (
        <ApiKeyModal
          webhookUrl="https://truesignal.com/strategies/123456788"
          key={"fsdfsdf"}
        />
      ),
      onConfirm: modals.closeAll,
    });

  const addStrategy = () =>
    modals.open({
      title: "Please confirm your action",
      size: "xl",
      // closeOnConfirm: false,
      // labels: { confirm: "Next", cancel: "Close" },
      children: <AddStrategyModal />,
      // onConfirm: openApiKeysModal,

      // onCancel: modals.closeAll,
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
