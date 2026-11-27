import { HTTPError } from 'ky'

export interface LaravelValidationError {
  message: string
  errors: Record<string, string[]>
}

export function isLaravelValidationError(data: unknown): data is LaravelValidationError {
  return typeof data === 'object' && data !== null && 'errors' in data && typeof (data as any).errors === 'object'
}

export function getValidationErrors(error: Error) {
  if (error instanceof HTTPError && error.response.status === 422) {
    const data = (error as HTTPError & { data?: unknown }).data
    if (isLaravelValidationError(data)) return data
  }
  return null
}
