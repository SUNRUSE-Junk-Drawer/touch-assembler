import view from "./view"
import {
  patch as ultradomPatch
} from "ultradom"

let loaded
addEventListener("load", () => {
  loaded = true
  refresh()
})

function refresh() {
  ultradomPatch(view(), document.body)
}

export default () => {
  if (loaded) refresh()
}