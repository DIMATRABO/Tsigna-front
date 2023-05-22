import {
  Paper,
  Group,
  rem,
  Progress,
  SimpleGrid,
  Text,
  Flex,
  Button,
} from "@mantine/core";
import { IconUserCircle, IconStar, IconCoin } from "@tabler/icons-react";
import { useStyles } from "components/shared/styles";

function MyStrategies() {
  const { classes } = useStyles();

  return (
    <>
      <SimpleGrid
        cols={4}
        spacing="md"
        breakpoints={[
          { maxWidth: "88rem", cols: 3, spacing: "md" },
          { maxWidth: "75rem", cols: 2, spacing: "md" },
          { maxWidth: "55rem", cols: 1, spacing: "sm" },
        ]}
      >
        {Array(6).fill(
          <Paper
            withBorder
            p="md"
            radius="md"
            shadow="sm"
            sx={(theme) => ({
              minWidth: rem(300),
            })}
          >
            <Group position="apart" noWrap>
              <Text weight={500} size="lg"></Text>
              <IconStar size="1.4rem" stroke={1.5} />
            </Group>
            <Flex align="center" mt="sm" gap={10}>
              <Flex gap={5}>
                <IconCoin size="1.4rem" stroke={1.5} />
                <Text c="dimmed" fz="sm">
                  USD
                </Text>
              </Flex>
              <Flex gap={5}>
                <IconUserCircle size="1.4rem" stroke={1.5} />
                <Text c="dimmed" fz="sm">
                  63/100
                </Text>
              </Flex>
              <Flex gap={5}>
                <IconUserCircle color="red" size="1.4rem" stroke={1.5} />
                <Text c="red" fz="sm">
                  100/100
                </Text>
              </Flex>
            </Flex>
            <Flex mt="sm" gap={20} align="center">
              <Flex direction={"column"}>
                <Text c="green" fz="xl" weight={500}>
                  750.00%
                </Text>
                <Text c="dimmed" fz="sm">
                  7D Roi
                </Text>
              </Flex>
              <Flex direction={"column"}>
                <Text c="green" fz="xl" weight={500}>
                  21,000.00
                </Text>
                <Text c="dimmed" fz="sm">
                  7D PNL
                </Text>
              </Flex>
            </Flex>
            <Flex gap={20} align="center">
              <Flex direction={"column"}>
                <Text
                  fz="xl"
                  weight={500}
                  sx={(theme) => ({ color: theme.colors.dark[4] })}
                >
                  750.00%
                </Text>
                <Text c="dimmed" fz="sm">
                  7D Roi
                </Text>
              </Flex>
              <Flex direction={"column"}>
                <Text
                  fz="xl"
                  weight={500}
                  sx={(theme) => ({ color: theme.colors.dark[4] })}
                >
                  00%
                </Text>
                <Text c="dimmed" fz="sm">
                  7D PNL
                </Text>
              </Flex>
            </Flex>
            <Flex justify={"space-between"} mt={20} align="center">
              <Flex direction={"column"}>
                <Text c="dimmed" fz="sm">
                  AUM: <span style={{ fontWeight: "bold" }}>21,000.00</span>
                </Text>
                <Text c="dimmed" fz="sm">
                  Runtime:
                  <span style={{ fontWeight: "bold" }}> 2 days</span>
                </Text>
              </Flex>
              <Button
                radius="xl"
                mt={10}
                variant="light"
                color="violet"
                size="sm"
              >
                copy
              </Button>
            </Flex>
          </Paper>
        )}
      </SimpleGrid>
    </>
  );
}

export default MyStrategies;
