import { Component, VNode, VNodeArrayChildren, h } from 'vue';
import mapValues from 'lodash/mapValues';
import { HtmlElement, HtmlElements } from '@/types/html-element';
import { Nullable } from '@/types/utils';
import { theme } from './theme';

// eslint-disable-next-line no-unused-vars
type RenderStyle = (props?: any) => void;
type Props = Nullable<Record<string, any>>;
type Children = { slots: VNode | VNodeArrayChildren };

const render = (component: HtmlElement) => (renderStyle: RenderStyle) => (props?: Props, children?: Children) => {
  return h(component, { ...props, class: renderStyle({ ...props, theme }) }, children?.slots);
};

const styled = mapValues(HtmlElements, render);

// TODO: uncomment the next line if the object created above is causing performance issues
// export default render

export default styled;

export const Styled = (component: Component) => (renderStyle: RenderStyle) => (props?: Props, children?: Children) => {
  return h(component, { ...props, class: renderStyle({ ...props, theme }) }, children?.slots);
};
