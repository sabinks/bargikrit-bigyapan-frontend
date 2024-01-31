import React from "react";
import { Switch } from "@headlessui/react";

export default function Swtich({ label, checked, onChange, name, disabled = false }: any) {
    return (
        <div>
            <div>{label}</div>
            <Switch
                disabled={disabled}
                checked={checked}
                onChange={(value) => onChange(value, name)}
                className={`${checked
                    ? "bg-yellow-400"
                    : "bg-yellow-200"
                    } relative inline-flex h-4 w-9 items-center rounded-full`}

            >
                <span className="sr-only">Enable notifications</span>
                <span
                    className={`${checked ? "translate-x-4" : "translate-x-0"
                        } inline-block h-5 w-5 transform rounded-full bg-white shadow-lg border transition`}
                />
            </Switch>


        </div>
    );
}
