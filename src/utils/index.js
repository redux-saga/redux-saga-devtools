
export const KEY_ARROW_DOWN = 40
export const KEY_ARROW_UP = 38
export const KEY_ARROW_LEFT = 37
export const KEY_ARROW_RIGHT = 39

export const id = x => x

export function withCapture(handler) {
  return e => {
    const res = handler(e)
    e.stopPropagation()
    return res
  }
}

export const trapMouseDown = {
  onMouseDown: e => e.stopPropagation()
}


export function cif(condition, className) {
  return condition ? className : ''
}

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
