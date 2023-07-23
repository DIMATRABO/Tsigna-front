import {
  Center,
  Flex,
  LoadingOverlay,
  Pagination,
  SimpleGrid,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getPublicStrategiesPaginated } from "services/strategy";
import { PublicStratPaginated } from "types/strategy";
import PublicStratCard from "./PublicStratCard";

type Props = {};

const LIMIT = 2;

const PublicStrategies = ({}: Props) => {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery<PublicStratPaginated>(
    ["publicStrategies", page],
    () => getPublicStrategiesPaginated(page, LIMIT)
  );

  if (isLoading) return <LoadingOverlay visible />;

  return (
    <Flex direction={"column"} gap="md">
      <SimpleGrid
        cols={4}
        spacing="md"
        breakpoints={[
          { maxWidth: "88rem", cols: 3, spacing: "md" },
          { maxWidth: "75rem", cols: 2, spacing: "md" },
          { maxWidth: "55rem", cols: 1, spacing: "sm" },
        ]}
      >
        {data &&
          data.strategies &&
          data.strategies.map((s) => (
            <PublicStratCard key={s.id} strategy={s} />
          ))}
      </SimpleGrid>
      <Center>
        <Pagination
          total={data?.total_records || 0}
          value={page}
          onChange={setPage}
          align="center"
        />
      </Center>
    </Flex>
  );
};

export default PublicStrategies;
