import { h } from 'vue';
import mapValues from 'lodash/mapValues';
import { theme } from './theme';

export const HtmlElements = {
  a: 'a',
  abbr: 'abbr',
  address: 'address',
  area: 'area',
  article: 'article',
  aside: 'aside',
  audio: 'audio',
  b: 'b',
  base: 'base',
  bdi: 'bdi',
  bdo: 'bdo',
  blockquote: 'blockquote',
  body: 'body',
  br: 'br',
  button: 'button',
  canvas: 'canvas',
  caption: 'caption',
  cite: 'cite',
  code: 'code',
  col: 'col',
  colgroup: 'colgroup',
  data: 'data',
  datalist: 'datalist',
  dd: 'dd',
  del: 'del',
  details: 'details',
  dfn: 'dfn',
  dialog: 'dialog',
  div: 'div',
  dl: 'dl',
  dt: 'dt',
  em: 'em',
  embed: 'embed',
  fieldset: 'fieldset',
  figcaption: 'figcaption',
  figure: 'figure',
  footer: 'footer',
  form: 'form',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  head: 'head',
  header: 'header',
  hgroup: 'hgroup',
  hr: 'hr',
  html: 'html',
  i: 'i',
  iframe: 'iframe',
  img: 'img',
  input: 'input',
  ins: 'ins',
  kbd: 'kbd',
  keygen: 'keygen',
  label: 'label',
  legend: 'legend',
  li: 'li',
  link: 'link',
  main: 'main',
  map: 'map',
  mark: 'mark',
  menu: 'menu',
  meta: 'meta',
  meter: 'meter',
  nav: 'nav',
  noindex: 'noindex',
  noscript: 'noscript',
  object: 'object',
  ol: 'ol',
  optgroup: 'optgroup',
  option: 'option',
  output: 'output',
  p: 'p',
  param: 'param',
  picture: 'picture',
  pre: 'pre',
  progress: 'progress',
  q: 'q',
  rp: 'rp',
  rt: 'rt',
  ruby: 'ruby',
  s: 's',
  samp: 'samp',
  script: 'script',
  section: 'section',
  select: 'select',
  small: 'small',
  source: 'source',
  span: 'span',
  strong: 'strong',
  style: 'style',
  sub: 'sub',
  summary: 'summary',
  sup: 'sup',
  table: 'table',
  template: 'template',
  tbody: 'tbody',
  td: 'td',
  textarea: 'textarea',
  tfoot: 'tfoot',
  th: 'th',
  thead: 'thead',
  time: 'time',
  title: 'title',
  tr: 'tr',
  track: 'track',
  u: 'u',
  ul: 'ul',
  var: 'var',
  video: 'video',
  wbr: 'wbr',
  webview: 'webview',
  svg: 'svg',
  animate: 'animate',
  animateMotion: 'animateMotion',
  animateTransform: 'animateTransform',
  circle: 'circle',
  clipPath: 'clipPath',
  defs: 'defs',
  desc: 'desc',
  ellipse: 'ellipse',
  feBlend: 'feBlend',
  feColorMatrix: 'feColorMatrix',
  feComponentTransfer: 'feComponentTransfer',
  feComposite: 'feComposite',
  feConvolveMatrix: 'feConvolveMatrix',
  feDiffuseLighting: 'feDiffuseLighting',
  feDisplacementMap: 'feDisplacementMap',
  feDistantLight: 'feDistantLight',
  feDropShadow: 'feDropShadow',
  feFlood: 'feFlood',
  feFuncA: 'feFuncA',
  feFuncB: 'feFuncB',
  feFuncG: 'feFuncG',
  feFuncR: 'feFuncR',
  feGaussianBlur: 'feGaussianBlur',
  feImage: 'feImage',
  feMerge: 'feMerge',
  feMergeNode: 'feMergeNode',
  feMorphology: 'feMorphology',
  feOffset: 'feOffset',
  fePointLight: 'fePointLight',
  feSpecularLighting: 'feSpecularLighting',
  feSpotLight: 'feSpotLight',
  feTile: 'feTile',
  feTurbulence: 'feTurbulence',
  filter: 'filter',
  foreignObject: 'foreignObject',
  g: 'g',
  image: 'image',
  line: 'line',
  linearGradient: 'linearGradient',
  marker: 'marker',
  mask: 'mask',
  metadata: 'metadata',
  mpath: 'mpath',
  path: 'path',
  pattern: 'pattern',
  polygon: 'polygon',
  polyline: 'polyline',
  radialGradient: 'radialGradient',
  rect: 'rect',
  stop: 'stop',
  switch: 'switch',
  symbol: 'symbol',
  text: 'text',
  textPath: 'textPath',
  tspan: 'tspan',
  use: 'use',
  view: 'view',
};

const render = (component) => (renderStyle) => (props, children) => {
  return h(
    component,
    { ...props, class: renderStyle({ ...props, theme }) },
    children?.slots,
  );
};

const styled = mapValues(HtmlElements, render);

export default styled;
