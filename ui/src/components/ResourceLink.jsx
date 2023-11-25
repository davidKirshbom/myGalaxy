import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { getResource } from "../fetchers/myGalaxyServer";

export default function ResourceLink({ to, ...rest }) {
  const { resource, id } = useMemo(() => {
    const [resource, id] = to.split("/").filter((str) => str !== "");
    return { resource, id };
  }, [to]);
  const {
    data: resourceData,
    isFetching,
    error,
  } = useQuery({
    queryKey: [resource, id],
    queryFn: async () => await getResource(resource, id),
  });
  if (isFetching) return <p>Seeking for more data</p>;
  if (error) return <p>N/A</p>;
  return (
    <Link to={to} {...rest}>
      {resourceData?.name || resourceData?.title || "Name not available"}
    </Link>
  );
}
