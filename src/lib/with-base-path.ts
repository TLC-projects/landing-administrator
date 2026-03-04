
/**
 * Utility function to prepend the base path to a given path.
 * This is useful for ensuring that all paths are correctly prefixed
 */
export const withBasePath = (path: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${path}`;