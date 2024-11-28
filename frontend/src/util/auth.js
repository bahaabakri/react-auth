import { redirect } from "react-router-dom"

export function getAuthenticationToken() {
    return localStorage.getItem('token') ?? null
}

export function getAuthenticationExpiredDate() {
    return localStorage.getItem('expireDateInTS') ?? null
}

export function getTimeToExpired() {
    if (!getAuthenticationExpiredDate()) {
        return null
    }
    return new Date().getTime() - getAuthenticationExpiredDate().getTime()
}
export function setAuthenticationToken(token) {
    localStorage.setItem('token', token)
    const expireDateInDate = new Date()
    expireDateInDate.setHours(expireDateInDate.getHours() + 1)
    localStorage.setItem('expireDateInTS', expireDateInDate.toISOString())
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