import { createContext, useContext } from "react";
import type { Lang } from "../../lib/cv-types";

export interface CvContextValue {
  lang: Lang;
  printable: boolean;
}

export const CvContext = createContext<CvContextValue>({ lang: "en", printable: false });
export const useCv = () => useContext(CvContext);
