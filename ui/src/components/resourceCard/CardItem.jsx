import styles from "../../styles/components/resourceCard.module.scss";
import { isValidHttpUrl } from "../../utils/validator";
import ResourceLink from "../ResourceLink";
import { useMemo } from "react";

export default function CardItem({ data, title }) {
  const isArray = useMemo(() => Array.isArray(data), [data]);
  const getStringOrLink = (str) => {
    return isValidHttpUrl(str) ? (
      <ResourceLink to={str}></ResourceLink>
    ) : (
      <p>{str}</p>
    );
  };
  if (isArray && data.length === 0) return <></>;
  return (
    <div className={styles.item}>
      {title ? <label>{title.replace("_", " ")}:</label> : <></>}
      {isArray ? (
        <div className={styles.list}>
          {data.map((item, index) => getStringOrLink(item))}
        </div>
      ) : (
        getStringOrLink(data)
      )}
    </div>
  );
}
