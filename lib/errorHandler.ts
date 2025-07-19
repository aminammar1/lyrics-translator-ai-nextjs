    export interface ApiError {
    message: string
    status?: number
    code?: string
    }

    export const handleApiError = (error: any): ApiError => {
    if (error?.message) {
        return {
        message: error.message,
        status: error.status,
        code: error.code,
        }
    }

    if (typeof error === 'string') {
        return { message: error }
    }

    return { message: 'An unexpected error occurred' }
    }
