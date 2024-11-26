import { redirect } from "react-router-dom"

export function getAuthenticationToken() {
    return localStorage.getItem('token') ?? null
}
export function setAuthenticationToken(token) {
    localStorage.setItem('token', token)
}
export function deleteAuthenticationToken() {
    localStorage.removeItem('token')
}
export function authLoader() {
    if (getAuthenticationToken()) {
        return null
    }
    return redirect('/auth?mode=login')
}

export function getAuthenticationTokenLoader() {
    return getAuthenticationToken()
}