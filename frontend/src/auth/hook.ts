import { useContext } from "react";
import { AuthContext, Context } from "./context";

export const useAuth = (): Context => {
  return useContext(AuthContext);
};
