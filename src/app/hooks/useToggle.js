import { useState } from "react";

export const useToggle = (initialState = false) => {
    const [value, setValue] = useState(initialState)
    const toggle = () => setValue(!value)
    return [value, toggle]
}