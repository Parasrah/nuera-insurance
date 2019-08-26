class StyleSheet {
  static create (obj) {
    return Object.getOwnPropertyNames(obj)
      .reduce((a, b) => ({ ...a, [b]: b }), {})
  }
}

function css (...styles) {
  return styles.join(' ')
}

export { StyleSheet, css }
