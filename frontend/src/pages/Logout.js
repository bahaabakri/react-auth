import { redirect } from "react-router-dom";
import { deleteAuthenticationToken } from "../util/auth";

export function logoutAction () {
    deleteAuthenticationToken()
    return redirect(window.location.pathname)
}