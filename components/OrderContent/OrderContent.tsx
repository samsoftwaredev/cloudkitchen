import { memo } from "react";
import { OrderType } from "@/interfaces";
import { centsToUSD, css, getOrderStatus, getTimeDifference } from "utils";
import styles from "./orderContent.module.scss";

const getAddress = (location: string = "") => {
  const address = location.split(",");

  let street = address[0];
  const city = address[1];
  const state = address[2].slice(1, 3);
  const addressLowerCase = street.toLowerCase();

  if (addressLowerCase.includes("apt")) {
    street = street.slice(0, addressLowerCase.lastIndexOf("apt"));
  } else if (addressLowerCase.includes("suite")) {
    street = street.slice(0, addressLowerCase.lastIndexOf("suite"));
  }
  const fullAddress = `${street},${city},${state}`;
  return encodeURI(fullAddress);
};

const OrderContent = ({ data }: { data: OrderType | null }) => {
  if (!data) return null;

  const location = getAddress(data.destination);

  return (
    <div className={styles.container}>
      <iframe
        className={styles.iframe}
        id="gmap_canvas"
        src={`https://maps.google.com/maps?q=${location}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
        frameBorder="0"
        scrolling="no"
        marginHeight={0}
        marginWidth={0}
      />
      <div className={styles.information}>
        <div className={css([styles.address, "text-muted"])}>
          {data.destination}
        </div>
        <h2 className={styles.name}>{data.customer}</h2>
        <div>
          <h4 className="text-muted">Item:</h4>
          <ul>
            <li>
              <div className={styles.item}>{data.item}</div>
            </li>
          </ul>
        </div>
        <div className={styles.price}>{centsToUSD(data.price)}</div>
        <div className={styles.status}>
          {getOrderStatus(data.event_name).toUpperCase()}
        </div>
        {data.orderHistory?.length! > 0 && (
          <div>
            <h4 className="text-muted">History:</h4>
            <ul>
              {data.orderHistory!.map((d) => (
                <li key={d.id}>
                  <div className={styles.item}>
                    {getTimeDifference(d.sent_at_second)} -
                    {getOrderStatus(d.event_name).toUpperCase()}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className={css([styles.time, "text-muted"])}>ID: {data.id}</div>
      </div>
    </div>
  );
};

export default memo(OrderContent);
