function path(root: string, subLink: string) {
  return `${root}${subLink}`;
}

export const ROOT_PATH = import.meta.env.REACT_APP_PATH || '';

export const PATH = {
  root: ROOT_PATH,
  notFound: path(ROOT_PATH, '/404'),
  home: path(ROOT_PATH, ''),
};
