import { createContext } from "react";
import type { ThemeContextType } from "@/types/contextType";

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);
