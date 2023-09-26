function path(root: string, subLink: string) {
  return `${root}${subLink}`;
}

export const ROOT_PATH = import.meta.env.REACT_APP_PATH || '';

export const PATH = {
  root: ROOT_PATH,
  notFound: path(ROOT_PATH, '/404'),
  mint: path(ROOT_PATH, '/mint'),
  lottery: path(ROOT_PATH, '/lottery'),
};
