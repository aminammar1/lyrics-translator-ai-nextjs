    import { Toaster } from 'react-hot-toast'

    export const ToastProvider = () => {
    return (
        <Toaster
        position="top-right"
        toastOptions={{
            duration: 4000,
            style: {
            background: 'rgba(17, 17, 17, 0.95)',
            color: '#ffb380',
            border: '1px solid rgba(255, 179, 128, 0.2)',
            borderRadius: '12px',
            backdropFilter: 'blur(8px)',
            },
            success: {
            style: {
                border: '1px solid rgba(34, 197, 94, 0.3)',
            },
            },
            error: {
            style: {
                border: '1px solid rgba(239, 68, 68, 0.3)',
            },
            },
        }}
        />
    )
    }
