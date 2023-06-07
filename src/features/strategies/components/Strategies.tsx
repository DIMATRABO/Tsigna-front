import { Button, Flex, LoadingOverlay, Tabs } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconMoodPin, IconSparkles } from "@tabler/icons-react";
import { useStyles } from "components/shared/styles";
import AddStrategyModal from "./AddStrategyModal";
import ApiKeyModal from "./ApiKeyModal";
import MyStrategies from "./MyStrategies";
import { getStrategies } from "services/strategy";
import { useQuery } from "@tanstack/react-query";

type Props = {};

const Strategies = ({}: Props) => {
  const { classes } = useStyles();

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
          {/* <Tabs.Tab
            value="popularStrategies"
            icon={<IconSparkles size="0.8rem" />}
          >
            Popular strategies
          </Tabs.Tab> */}
        </Tabs.List>

        <Tabs.Panel value="myStrategies" pt="xs">
          <MyStrategies />
        </Tabs.Panel>

        {/* <Tabs.Panel value="popularStrategies" pt="xs">
          <MyStrategies isPopular />
        </Tabs.Panel> */}
      </Tabs>
    </Flex>
  );
};

export default Strategies;
