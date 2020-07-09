export function setUser(state, user) {
  state.user = user;
}

export function setLock(state, bool) {
  state.locked = bool;
}

export function setError(state, error) {
  state.error = error;
}

export function setErrors(state, error) {
  state.errorMessage = error;
}
