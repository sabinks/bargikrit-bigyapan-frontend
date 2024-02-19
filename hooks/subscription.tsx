import * as React from "react";
import { SubscriptionContext } from "../context/subscription";

export function useSubscription() {
    return React.useContext(SubscriptionContext);
}
