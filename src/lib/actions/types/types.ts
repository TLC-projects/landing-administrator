export type ActionResult<T = never> = {
  status: boolean | null;
  message: string;
  code?: string;
  httpStatus?: number;
} & ([T] extends [never] ? object : { data?: T });
