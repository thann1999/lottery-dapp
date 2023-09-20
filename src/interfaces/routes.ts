export interface RouteItem {
  path?: string;
  guard?: (props: any) => JSX.Element;
  layout?: (value: RouteItem) => JSX.Element;
  component?: React.LazyExoticComponent<() => JSX.Element>;
  handle?: Record<string, any>;
  routes?: RouteItem[];
  noMargin?: boolean;
}
