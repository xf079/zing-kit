export type BtnFormType = "button" | "submit" | "reset";

export type BtnVariant = "contained" | "text" | "outlined";

export type BtnSize = "tiny" | "small" | "large";

export type BtnColor = "primary" | "success" | "warning" | "danger";

export type BtnShape = "square" | "round";

export type BtnIconPosition = "left" | "right";

export interface BtnTheme{
  [key: string]: string;
}
