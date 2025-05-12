import { authHeader, fetchJSON } from "./editProfileApi";

export function getPendingUsers() {
  return fetchJSON("/api/users/pending", {
    headers: authHeader(),
  });
}

export function approveUser(id) {
  return fetchJSON(`/api/users/${id}/approve`, {
    method: "PATCH",
    headers: authHeader(),
  });
}
