<template>
  <el-select
    ref="innerSelect"
    v-bind="$attrs"
    v-on="listeners"
    :popper-append-to-body="false">
    <slot></slot>
  </el-select>
</template>

<script>
export default {
  name: 'AppendableSelect',
  inheritAttrs: false,
  props: {
    // Optional: auto-detect nearest el-form when not provided
    appendTo: {
      type: [String, Object, Function],
      default: null
    },
    // Selector used for auto-detection, default targets el-form root class
    autoAppendSelector: {
      type: String,
      default: '.el-form'
    }
  },
  data() {
    return {
      // Tracks whether the popper node has already been moved to the target
      hasMoved: false
    }
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        'visible-change': this.handleVisibleChange
      }
    }
  },
  methods: {
    resolveTarget() {
      // 1. Explicit prop takes priority
      if (this.appendTo) {
        if (typeof this.appendTo === 'string') {
          return document.querySelector(this.appendTo)
        }
        if (typeof this.appendTo === 'function') {
          const resolved = this.appendTo()
          return resolved && resolved.$el ? resolved.$el : resolved
        }
        return this.appendTo.$el ? this.appendTo.$el : this.appendTo
      }
      // 2. Fallback: auto-detect nearest el-form ancestor
      return this.findClosestForm()
    },
    findClosestForm() {
      let el = this.$el
      while (el && el !== document.body) {
        el = el.parentElement
        if (el && el.classList && el.classList.contains(this.autoAppendSelector.replace('.', ''))) {
          return el
        }
      }
      return null
    },
    handleVisibleChange(visible) {
      this.$emit('visible-change', visible)

      const select = this.$refs.innerSelect
      if (!select) return

      // Case 1: first time opening, popper node not moved yet.
      // Move it, then force a close+reopen cycle so Popper.js
      // recalculates position against the new offsetParent.
      if (visible && !this.hasMoved) {
        this.$nextTick(() => {
          const target = this.resolveTarget()
          if (!select.$refs.popper || !target) return

          const popperEl = select.$refs.popper.$el || select.$refs.popper
          target.appendChild(popperEl)
          this.hasMoved = true

          // Destroy the stale Popper.js instance so it doesn't keep
          // using the offsetParent captured before the DOM move.
          if (select.popperJS) {
            select.popperJS.destroy()
            select.popperJS = null
          }

          // Force a hide/show cycle: this makes Element UI recreate
          // the Popper.js instance from scratch, now using the
          // correct (already moved) offsetParent.
          select.visible = false
          this.$nextTick(() => {
            select.visible = true
            this.$nextTick(() => {
              if (typeof select.updatePopper === 'function') {
                select.updatePopper()
              }
            })
          })
        })
        return
      }

      // Case 2: node already moved in a previous open, just refresh position.
      if (visible && this.hasMoved) {
        this.$nextTick(() => {
          if (typeof select.updatePopper === 'function') {
            select.updatePopper()
          }
        })
      }
    },
    focus() {
      this.$refs.innerSelect && this.$refs.innerSelect.focus()
    },
    blur() {
      this.$refs.innerSelect && this.$refs.innerSelect.blur()
    }
  }
}
</script>
