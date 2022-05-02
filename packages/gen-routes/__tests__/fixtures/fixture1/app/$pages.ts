/**
 * This is a generated file.
 */
export interface IPages extends React.FC {
  Layout: JSX.Element
}

type Pages = {
  [key: string]: IPages
}

const pages: Pages = {
  '/about': require('./pages/about/index').default,
  '': require('./pages/index').default,
}

// TODO: add this only if the file exists
export const LayoutDefault = require('./layouts/default').default

export default pages
