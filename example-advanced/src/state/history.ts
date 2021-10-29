import { AppData, INITIAL_DATA } from './constants'
import { current } from 'immer'

export function makeHistory(ID = '@tldraw/core_advanced_example') {
  let initialData = INITIAL_DATA

  const saved = localStorage.getItem(ID)
  if (saved !== null) {
    initialData = JSON.parse(saved)
  }

  let stack: AppData[] = [initialData]
  let pointer = 0

  function persist(data: AppData) {
    delete data.pageState.hoveredId
    data.overlays.snapLines = []
    localStorage.setItem(ID, JSON.stringify(data))
  }

  function push(data: AppData) {
    if (pointer < stack.length - 1) {
      console.log('slicing')
      stack = stack.slice(0, pointer + 1)
    }
    const serialized = current(data)
    stack.push(serialized)
    pointer = stack.length - 1
    persist(serialized)
    return true
  }

  function undo() {
    if (pointer <= 0) return false
    pointer--
    const data = stack[pointer]
    persist(data)
    return data
  }

  function redo() {
    if (pointer >= stack.length - 1) return false
    pointer++
    const data = stack[pointer]
    persist(data)
    return data
  }

  function reset() {
    stack = [INITIAL_DATA]
    pointer = 0
    localStorage.set(INITIAL_DATA)
    return INITIAL_DATA
  }

  function restore() {
    return initialData
  }

  return { push, undo, redo, reset, restore }
}