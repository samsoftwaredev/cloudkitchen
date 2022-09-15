export const css = (string: Array<string>) =>
  string.filter((str) => str ?? true).join(" ");
