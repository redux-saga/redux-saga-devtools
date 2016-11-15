import { is, asEffect } from 'redux-saga/utils'

export function pathHasChanged(currentPath, newPath) {
  if(
    (!currentPath && newPath)  ||
    (currentPath && !newPath) ||
    (currentPath.length < newPath.length)
  ) {
    return true
  }
  else {
    for (var i = 0; i < newPath.length; i++) {
      if( currentPath[i] !== newPath[i] ) {
        return true
      }
    }
  }
  return false
}
