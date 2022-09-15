import { OrderEventType } from "../interfaces";

export const arraysAreTheSame = (arr1?: Array<any>, arr2?: Array<any>) =>
  JSON.stringify(arr1) === JSON.stringify(arr2);

export const getOrderStatus = (status: OrderEventType) => {
  switch (status) {
    case "CREATED":
      return "Created";
    case "COOKED":
      return "Cooked";
    case "DRIVER_RECEIVED":
      return "Driver Received";
    case "DELIVERED":
      return "Delivered";
    case "CANCELLED":
      return "Cancelled";
    default:
      return "";
  }
};
