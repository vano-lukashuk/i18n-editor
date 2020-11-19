import ResizeSplitPane from 'vue-resize-split-pane'
import { Splitpanes, Pane } from 'splitpanes'
import Icon from './icon'
import Button from './button'
import Badge from './badge.vue'

import CodeMirror from './codemirror'

import 'splitpanes/dist/splitpanes.css'

export default function (Vue) {
  Vue.component('rsPane', ResizeSplitPane)

  Vue.component('splitpanes', Splitpanes)
  Vue.component('pane', Pane)

  Vue.component('v-icon', Icon)
  Vue.component('v-btn', Button)
  Vue.component('codemirror', CodeMirror)
  Vue.component('badge', Badge)
}
