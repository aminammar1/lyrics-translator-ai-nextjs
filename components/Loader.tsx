    import { ClipLoader } from 'react-spinners'

    export interface LoaderProps {
    width?: number
    color?: string
    strokeWidth?: number
    animationDuration?: number
    }

    export function Loader({
    width = 48,
    color = 'orange',
    strokeWidth = 5,
    animationDuration = 0.5,
    }: LoaderProps) {
    return (
        <ClipLoader
        size={width}
        color={color}
        speedMultiplier={1 / animationDuration}
        cssOverride={{
            borderWidth: strokeWidth,
            display: 'block',
            margin: 'auto',
        }}
        />
    )
}
