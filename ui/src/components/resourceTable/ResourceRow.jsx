import { useLinkClickHandler } from "react-router-dom";
import styles from "../../styles/components/ResourceTable.module.scss";

export function ResourceRow({ row, resource }) {
  const id = row.id;
  let handleClick = useLinkClickHandler(`/${resource}/${id}`);

  return (
    <tr
      onClick={(e) => handleClick(e)}
      className={[styles.clickableRow, styles.row].join(" ")}
    >
      {row.list.map((item, index) => {
        return (
          <td key={index} className={styles.cell}>
            {item}
          </td>
        );
      })}
    </tr>
  );
}
