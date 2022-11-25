function isBrowser(): boolean {
  return typeof window !== 'undefined'
}

export function hasToken(): boolean {
  if (! isBrowser()) return false
  return getToken() !== null
}

export function getToken(): string | null {
  if (! isBrowser()) return null
  const token = localStorage.getItem('token')
  return token
}

export function setToken(token: string | null): void {
  if (! isBrowser()) return;
  if (token !== null) {
    localStorage.setItem('token', token)
  } else {
    localStorage.removeItem('token')
  }
}
