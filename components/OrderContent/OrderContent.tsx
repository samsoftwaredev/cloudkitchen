import { centsToUSD, css } from "utils";
import styles from "./orderContent.module.scss";

interface Props {
  data?: {
    destination: string;
    time: number;
    customer: string;
    item: string;
    price: number;
    event_name: string;
  } | null;
}

const getAddress = (location: string = "") => {
  let address = location.split(",")[0];
  const addressLowerCase = address.toLowerCase();

  if (addressLowerCase.includes("apt")) {
    address = address.slice(0, addressLowerCase.lastIndexOf("apt"));
  } else if (addressLowerCase.includes("suite")) {
    address = address.slice(0, addressLowerCase.lastIndexOf("suite"));
  }
  return encodeURI(address);
};

const OrderContent = ({ data }: Props) => {
  if (!data) return null;

  const location = getAddress(data.destination);

  return (
    <div className={styles.container}>
      <iframe
        width="600"
        height="500"
        id="gmap_canvas"
        src={`https://maps.google.com/maps?q=${location}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
        frameBorder="0"
        scrolling="no"
        marginHeight={0}
        marginWidth={0}
      />
      <div className={styles.information}>
        <div className={css([styles.time, "text-muted"])}>{data.time}</div>
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
        <div className={styles.status}>{data.event_name}</div>
      </div>
    </div>
  );
};

export default OrderContent;
