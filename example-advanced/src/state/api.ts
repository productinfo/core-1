import type { Shape } from 'shapes'
import type { machine } from './machine'

/*
Example API

When creating an app like this one, you may want to create an
imperative API for interacting with the app state.  Such an API 
is useful for testing, debugging, or even rendering screenshots 
on a server.

In the `app.tsx` file, we create an instance of the API class, 
pass it into an `onMount` callback, and also add it to the window.
To use the API, start the advanced-example development server, visit
`localhost:5000`, and open the console. You can control the app by
running methods like:

```js
api.selectAll()
api.delete()
api.createShapes({ id: "myBox", type: "box" })
api.getShape('myBox')
```
*/

export class Api {
  constructor(private _machine: typeof machine) {}

  reset = () => {
    this.machine.send('RESET')
    return this
  }

  cancel = () => {
    this.machine.send('CANCELLED')
    return this
  }

  delete = () => {
    this.machine.send('DELETED')
    return this
  }

  selectAll = () => {
    this.machine.send('SELECTED_ALL')
    return this
  }

  deselectAll = () => {
    this.machine.send('DESELECTED_ALL')
    return this
  }

  zoomToFit = () => {
    this.machine.send('ZOOMED_TO_FIT')
    return this
  }

  zoomToSelection = () => {
    this.machine.send('ZOOMED_TO_SELECTION')
    return this
  }

  zoomIn = () => {
    this.machine.send('ZOOMED_IN')
    return this
  }

  zoomOut = () => {
    this.machine.send('ZOOMED_OUT')
    return this
  }

  undo = () => {
    this.machine.send('UNDO')
    return this
  }

  redo = () => {
    this.machine.send('REDO')
    return this
  }

  selectTool = (name: string) => {
    this.machine.send('SELECTED_TOOL', { name })
    return this
  }

  createShapes = (...shapes: (Partial<Shape> & Pick<Shape, 'type'>)[]) => {
    this.machine.send('CREATED_SHAPES', { shapes })
    return this
  }

  getShape = (id: string) => {
    return this.machine.data.page.shapes[id]
  }

  getBinding = (id: string) => {
    return this.machine.data.page.bindings[id]
  }

  send = this._machine.send

  isIn = this._machine.isIn

  isInAny = this._machine.isInAny

  log = this._machine.log

  get machine() {
    return this._machine
  }

  get state() {
    return this.machine.data
  }

  get page() {
    return this.machine.data.page
  }

  get pageState() {
    return this.machine.data.pageState
  }

  get selectedIds() {
    return this.machine.data.pageState.selectedIds
  }

  get lastEvent() {
    return this.log[0]
  }
}
