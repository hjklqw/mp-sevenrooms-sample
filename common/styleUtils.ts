export function compoundClassName(names: { [style: string]: boolean }) {
  const res: string[] = []
  return Object.entries(names)
    .reduce(
      (result, [style, shouldUse]) => (shouldUse ? [...result, style] : result),
      res
    )
    .join(' ')
}
