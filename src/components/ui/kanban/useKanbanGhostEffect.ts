export const useKanbanGhostEffect = () => {
  let ghostEl: HTMLElement | null = null

  const createGhost = (sourceEl: HTMLElement) => {
    const ghost = sourceEl.cloneNode(true) as HTMLElement

    ghost.style.width = `${sourceEl.offsetWidth}px`
    ghost.style.height = `${sourceEl.offsetHeight}px`
    ghost.style.pointerEvents = 'none'
    ghost.style.position = 'absolute'
    ghost.style.transform = 'translate(-9999px, -9999px)'

    document.body.appendChild(ghost)
    ghostEl = ghost
    return ghost
  }

  const createGhostMobile = (sourceEl: HTMLElement, touch: Touch) => {
    const ghost = sourceEl.cloneNode(true) as HTMLElement

    ghost.style.width = `${sourceEl.offsetWidth}px`
    ghost.style.maxHeight = `${sourceEl.offsetHeight}px`
    ghost.style.pointerEvents = 'none'
    ghost.style.position = 'fixed'
    ghost.style.opacity = '0.9'
    ghost.style.zIndex = '99999'

    ghost.style.left = touch.clientX + 'px'
    ghost.style.top = touch.clientY + 'px'

    document.body.appendChild(ghost)
    ghostEl = ghost
  }

  const moveMobileGhost = (touch: Touch) => {
    if (!ghostEl) return
    ghostEl.style.left = touch.clientX + 'px'
    ghostEl.style.top = touch.clientY + 'px'
  }

  const removeGhost = () => {
    if (ghostEl) {
      ghostEl.remove()
      ghostEl = null
    }
  }

  return { createGhost, createGhostMobile, moveMobileGhost, removeGhost }
}
