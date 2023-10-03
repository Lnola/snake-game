export const theme = {} as const;

export type Theme = typeof theme;

export type BaseProps = {
  theme: Theme;
};
