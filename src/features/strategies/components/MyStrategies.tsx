import {
  Paper,
  Group,
  rem,
  Progress,
  SimpleGrid,
  Text,
  Flex,
  Button,
  LoadingOverlay,
} from "@mantine/core";
import { IconUserCircle, IconStar, IconCoin } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useStyles } from "components/shared/styles";
import { useState } from "react";
import { getStrategies } from "services/strategy";
import StrategyCard from "./StrategyCard";
import { Strategy } from "types/strategy";
import PopularStrategyCard from "./PopularStrategyCard";

type Props = {
  isPopular?: boolean;
};

function Strategies({ isPopular }: Props) {
  const { classes } = useStyles();

  const { data: myStrategies, isLoading } = useQuery<Strategy[]>(
    ["myStrategies"],
    getStrategies
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
        {!isPopular &&
          myStrategies &&
          myStrategies.map((s) => <StrategyCard key={s.id} strategy={s} />)}

        {isPopular &&
          Array.from({ length: 8 }).map((_, i) => (
            <PopularStrategyCard key={i} />
          ))}
      </SimpleGrid>
    </>
  );
}

export default Strategies;
