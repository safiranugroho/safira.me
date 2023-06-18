import { format } from "date-fns";

export const dMMMMyyyy = (date: Date) => format(date, 'd MMMM yyyy');