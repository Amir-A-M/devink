export function getString(fd: FormData, name: string) {
  const value = fd.get(name)
  return typeof value === 'string' ? value : ''
}
