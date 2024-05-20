import { useMediaQuery } from "react-responsive"

const breakpoints = {
    xs: "576px",
    sm: "768px",
    md: "992px",
    lg: "1200px",
    xl: "1600px"
}

export const useBreakpoints = () => {
    const isXs = useMediaQuery({ maxWidth: breakpoints.xs })
    const isSm = useMediaQuery({ maxWidth: breakpoints.sm })
    const isMd = useMediaQuery({ maxWidth: breakpoints.md })
    const isLg = useMediaQuery({ maxWidth: breakpoints.lg })
    const isXl = useMediaQuery({ maxWidth: breakpoints.xl })

    return { isXs, isSm, isMd, isLg, isXl }
}

export default breakpoints