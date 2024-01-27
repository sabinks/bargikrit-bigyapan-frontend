import * as React from "react";
import { ApplicationContext } from "../context/application";

export function useApplication() {
    return React.useContext(ApplicationContext);
}
