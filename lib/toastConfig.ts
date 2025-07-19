
    export const toastConfig = {
    duration: 4000,
    position: 'top-right' as const,
    style: {
        background: 'rgba(17, 17, 17, 0.95)',
        color: '#ffb380',
        border: '1px solid rgba(255, 179, 128, 0.2)',
        borderRadius: '12px',
        backdropFilter: 'blur(8px)',
    },
    }

    export const successToastStyle = {
    border: '1px solid rgba(34, 197, 94, 0.3)',
    }

    export const errorToastStyle = {
    border: '1px solid rgba(239, 68, 68, 0.3)',
    }
