import {
  LoadingOverlay,
  SimpleGrid
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useStyles } from "components/shared/styles";
import { getPopularStrategies } from "services/strategy";
import { Strategy } from "types/strategy";
import StrategyCard from "./StrategyCard";

type Props = {
};

function Strategies({  }: Props) {
  const { classes } = useStyles();

  const { data: myStrategies, isLoading } = useQuery<Strategy[]>(
    ["myStrategies"],
    getPopularStrategies
  );

  console.log("myStrategies", myStrategies);

  if (isLoading) return <LoadingOverlay visible />;

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
        {
          myStrategies &&
          myStrategies.map((s) => <StrategyCard key={s.id} strategy={s} />)}

       
      </SimpleGrid>
    </>
  );
}

export default Strategies;
