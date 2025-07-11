import { atomWithReset } from "jotai/utils";
import type { FloatingAlertProps } from "../components/alerts/floatingAlert/FloatingAlert";
import { atom } from "jotai";

export const floatingAlertAtom = atomWithReset<FloatingAlertProps>({
    visible: false,
    title: "",
    message: "",
    type: "info",
    duration: 3000,
})

export const showFloatingAlertAtom = atom(null, (get, set, alert: FloatingAlertProps) => {
    set(floatingAlertAtom, {
        ...alert,
        visible: true,
    });
})
