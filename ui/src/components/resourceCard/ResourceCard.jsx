import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import { getResource } from "../../fetchers/myGalaxyServer";
import Loader from "../Loader";
import styles from "../../styles/components/resourceCard.module.scss";
import generalStyles from "../../styles/general.module.scss";

import CardItem from "./CardItem";
export function ResourceCard() {
  const { resource, id } = useParams();
  const {
    data: resourceData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [resource, id],
    queryFn: async () => await getResource(resource, id),
  });

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <p className={generalStyles.error}>
        {error?.response?.status === 404
          ? "Resource not found"
          : "Problem occurred please try again later!"}
      </p>
    );
  return (
    <div className={styles.card}>
      {Object.keys(resourceData).map((title) => {
        const data = resourceData[title];
        return <CardItem data={data} title={title} />;
      })}
    </div>
  );
}
