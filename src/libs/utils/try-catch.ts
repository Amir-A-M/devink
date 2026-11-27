interface Success<T> {
  data: T
  error: null
}

interface Failure {
  data: null
  error: Error
}

export type Result<T> = Failure | Success<T>

export async function tryCatch<T>(promise: Promise<T>): Promise<Result<T>> {
  try {
    return { data: await promise, error: null }
  } catch (e) {
    return { data: null, error: e instanceof Error ? e : new Error(String(e)) }
  }
}
