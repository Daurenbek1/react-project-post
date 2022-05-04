import { useState } from "react";

export const useFetching = (callback) => {
    const [isLoading, setIstLoading] = useState(false);
    const [error, setError] = useState('')

    const fetching = async (...args) => {
        try {
            setIstLoading(true)
            await callback(...args)
        } catch(e) {
            setError(e.message)
        } finally {
            setIstLoading(false)
        }
    }
    return [fetching, isLoading, error]
}