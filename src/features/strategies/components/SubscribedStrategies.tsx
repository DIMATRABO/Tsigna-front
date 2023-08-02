import { Center, LoadingOverlay, Pagination, SimpleGrid } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import {
  getPopularStrategies,
  getSubscribedStrategiesPaginated,
} from "services/strategy";
import StrategyCard from "./StrategyCard";
import { StrategiesResponse, Strategy } from "types/strategy";
import { useContext, useState } from "react";
import { AuthContext } from "context/user";

type Props = {};

const LIMIT = 2;

const SubscribedStrategies = ({}: Props) => {
  const [page, setPage] = useState(1);
  const { user } = useContext(AuthContext);

  const { data: subscribedStrategies, isLoading } =
    useQuery<StrategiesResponse>(
      ["subscribedStrategies", page],
      () => getSubscribedStrategiesPaginated(user?.id || "", page, LIMIT),
      {
        enabled: !!user && !!user.id,
      }
    );

  console.log("subscribedStrategies", subscribedStrategies);

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
        {subscribedStrategies?.strategies &&
          subscribedStrategies.strategies.length > 0 &&
          subscribedStrategies.strategies.map((s) => (
            <StrategyCard key={s.id} strategy={s} />
          ))}
      </SimpleGrid>
      <Center>
        <Pagination
          total={
            subscribedStrategies?.total_records
              ? Math.round(subscribedStrategies.total_records / LIMIT)
              : 0
          }
          value={page}
          onChange={setPage}
          align="center"
        />
      </Center>
    </>
  );
};

export default SubscribedStrategies;
