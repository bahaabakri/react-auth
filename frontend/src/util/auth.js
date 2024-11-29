import { redirect } from "react-router-dom"

export function getAuthenticationToken() {
    const token = localStorage.getItem('token')
    if (!token) {
        return null
    }
    if(getTimeToExpired() < 0) {
        return 'Expired'
    }
    return token
}

export function getAuthenticationExpiredDate() {
    return localStorage.getItem('expireDateInTS') ?? null
}

export function getTimeToExpired() {
    if (!getAuthenticationExpiredDate()) {
        return null
    }
    return new Date(getAuthenticationExpiredDate()).getTime() - new Date().getTime()
}
export function setAuthenticationToken(token) {
    localStorage.setItem('token', token)
    const expireDateInDate = new Date()
    expireDateInDate.setMinutes(expireDateInDate.getMinutes() + 2)
    localStorage.setItem('expireDateInTS', expireDateInDate.toISOString())
}
export function deleteAuthenticationToken() {
    localStorage.removeItem('token')
    localStorage.removeItem('expireDateInTS')
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