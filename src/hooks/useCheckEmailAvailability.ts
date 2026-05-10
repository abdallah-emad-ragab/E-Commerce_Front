import axios from "axios";
import { useState } from "react";

type TStatus = "idle" | "checking" | "available" | "unavailable" | "failed";

export default function useCheckEmailAvailability() {
    const [emailAbailabilityStatus, setEmailAvailabilityStatus] = 
        useState<TStatus>("idle");
    const [enteredEmail, setEnteredEmail] = useState<null | string>(null);

    const checkEmailAvailability = async (email: string) => {
        setEnteredEmail(email);
        setEmailAvailabilityStatus("checking");
        try {
            const response = await axios.get(`/users?email=${email}`);
            if (!response.data.length) {
                setEmailAvailabilityStatus("available");
            } else {
                setEmailAvailabilityStatus("unavailable");
            }
        } catch (error) {
            setEmailAvailabilityStatus("failed");
            console.log(error);
        }
    }

    const resetEmailAvailabilityStatus = () => {
        setEmailAvailabilityStatus("idle");
        setEnteredEmail(null);
    }

    return { emailAbailabilityStatus, enteredEmail, checkEmailAvailability, resetEmailAvailabilityStatus };
}