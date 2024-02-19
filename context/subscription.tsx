import React, { useEffect, useState } from "react";

interface StateType {
    subscriptionList: [];
    subscription: any;
}

interface SubscriptionType {
    subscriptionState: StateType,
    setSubscriptionState: Function,
}

export const SubscriptionContext = React.createContext<SubscriptionType>(null!);

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {

    const [subscriptionState, setSubscriptionState] = React.useState<any>({
        subscriptionList: [],
        subscription: {},
    });

    const value = {
        subscriptionState, setSubscriptionState
    };

    return <SubscriptionContext.Provider value={value}>{children}</SubscriptionContext.Provider>;
}
