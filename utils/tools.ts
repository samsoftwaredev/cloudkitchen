export const arraysAreTheSame = (arr1?: Array<any>, arr2?: Array<any>) =>
  JSON.stringify(arr1) === JSON.stringify(arr2);
