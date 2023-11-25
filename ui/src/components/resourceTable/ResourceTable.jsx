import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import { getResourceList } from "../../fetchers/myGalaxyServer";
import { isValidHttpUrl } from "../../utils/validator";
import Loader from "../Loader";
import styles from "../../styles/components/ResourceTable.module.scss";
import { ResourceRow } from "./ResourceRow";
import generalStyles from "../../styles/general.module.scss";
import { useState } from "react";
import { useEffect } from "react";
const DEFAULT_ROW_LIMIT = 2;
export default function ResourceTable() {
  const { resource } = useParams();
  const [rowsLimit, setRowsLimit] = useState(DEFAULT_ROW_LIMIT);
  console.log({ resource });
  const {
    data: { titles: resourceTitles, ResourceTable },
    isFetching,
    isError,
    error,
    isStale,
    refetch,
  } = useQuery({
    queryKey: ["ResourceTable", resource],
    queryFn: async () => {
      const resourcesData = (await getResourceList(resource)).results;
      const titles = Object.keys(resourcesData[0]).filter(
        (resourceTitle) =>
          !Array.isArray(resourcesData[0][resourceTitle]) &&
          !isValidHttpUrl(resourcesData[0][resourceTitle])
      );
      const ResourceTable = resourcesData.map((resourceData) => {
        const id = resourceData.id;
        let result = { id: id, list: [] };
        for (const title of titles) result.list.push(resourceData[title]);
        return result;
      });
      return { titles, ResourceTable };
    },

    initialData: {},
    staleTime: 0,
  });

  if (isFetching) return <Loader />;
  if (isError) {
    return (
      <p className={generalStyles.error}>
        {error?.response?.status === 404
          ? "Resource not found"
          : "Problem occurred please try again later!"}
      </p>
    );
  }

  return (
    <>
      <div className={styles.container}>
        <table className={styles.table}>
          <thead>
            <tr>
              {resourceTitles?.map((title) => (
                <th key={title} className={styles.headerCell}>
                  {title.replace("_", " ")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ResourceTable?.slice(0, rowsLimit).map((row) => {
              return <ResourceRow row={row} resource={resource} />;
            })}
          </tbody>
        </table>
      </div>
      <button
        onClick={() => setRowsLimit(rowsLimit ? undefined : DEFAULT_ROW_LIMIT)}
        className={styles.collapseButton}
      >
        {"See " + (rowsLimit ? "more" : "less")}
      </button>
    </>
  );
}
