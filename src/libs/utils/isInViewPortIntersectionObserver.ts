export interface InviewPortType {
  distanceFromEnd: number
  callback: () => boolean
  target: HTMLElement
}

const checkInViewIntersectionObserver = ({ target, distanceFromEnd, callback }: InviewPortType) => {
  const _funCallback: IntersectionObserverCallback = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) => {
    entries.map((entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting) {
        const unobserve = callback()
        if (unobserve) observer.unobserve(entry.target)
      }
      return true
    })
  }

  if (typeof window.IntersectionObserver === 'undefined') {
    console.error('window.IntersectionObserver === undefined! => Your Browser is Notsupport')
    return
  }
  const options = {
    root: null,
    rootMargin: `${distanceFromEnd}px 0px`,
    threshold: 0,
  }
  const observer = new IntersectionObserver(_funCallback, options)
  observer.observe(target)
}

export default checkInViewIntersectionObserver
