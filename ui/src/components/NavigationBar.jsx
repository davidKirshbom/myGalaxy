import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { getResources } from "../fetchers/myGalaxyServer";
import styles from "../styles/components/navigationBar.module.scss";
import Loader from "./Loader";
import icon from "/starship.svg?url";
export default function NavigationBar() {
  const { data: resources, isFetching } = useQuery({
    queryKey: ["resources"],
    queryFn: getResources,
  });
  const location = useLocation();

  if (isFetching) return <Loader />;
  return (
    <nav className={styles.container}>
      {
        <div className={styles.logoContainer}>
          <img className={styles.logo} src={icon}></img>
        </div>
      }
      {Object.keys(resources).map((resourceName) => {
        const isSelected = location.pathname.includes(resourceName);
        return (
          <>
            <Link
              key={resourceName}
              className={[styles.item, isSelected ? styles.selected : ""].join(
                " "
              )}
              to={resourceName}
            >
              {resourceName}
            </Link>
            <br />
          </>
        );
      })}
    </nav>
  );
}
