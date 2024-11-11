export type Result<T> = {
  type: string;
  status: number;
  data: T;
};
