import { Paper, Group, ThemeIcon, Text } from "@mantine/core";
import { IconUserPlus } from "@tabler/icons-react";

type Props = {
  title: string;
  number: number;
};

const DashboardCard = ({ title, number }: Props) => {
  return (
    <Paper withBorder p="md" radius="md">
      <Group position="apart">
        <div>
          <Text
            c="dimmed"
            tt="uppercase"
            fw={700}
            fz="xs"
            // className={classes.label}
          >
            {title}
          </Text>
          <Text fw={700} fz="xl">
            {number}
          </Text>
        </div>
        {/* <ThemeIcon
      color="gray"
      variant="light"
      sx={(theme) => ({
        color:
          item.diff > 0
            ? theme.colors.teal[6]
            : theme.colors.red[6],
      })}
      size={38}
      radius="md"
    >
      <IconUserPlus size="1.8rem" stroke={1.5} />
    </ThemeIcon> */}
      </Group>
      {/* <Text c="dimmed" fz="sm" mt="md">
    <Text
      component="span"
      c={item.diff > 0 ? "teal" : "red"}
      fw={700}
    >
      {item.diff}%
    </Text>{" "}
    {item.diff > 0 ? "increase" : "decrease"} compared to last month
  </Text> */}
    </Paper>
  );
};

export default DashboardCard;
