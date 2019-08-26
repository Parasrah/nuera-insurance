const breakpoint = 1000

function desktop (styles) {
  return {
    [`@media (min-width: ${breakpoint + 1}px)`]: {
      ...styles
    }
  }
}

function mobile (styles) {
  return {
    [`@media (max-width: ${breakpoint}px)`]: {
      ...styles
    }
  }
}

export { desktop, mobile }
