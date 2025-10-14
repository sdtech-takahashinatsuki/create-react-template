import { ChildrenOnly } from "@/shared/types/react";
import { CheckerProps } from "@/shared/types/object";
import { boxVariants } from "./box.css";
import { ElementType } from "react";

type BoxWidth = keyof typeof boxVariants.boxWidthStyle;
type BoxHeight = keyof typeof boxVariants.boxHeightStyle;
type BoxShadow = keyof typeof boxVariants.boxShadowStyle;
type BoxColor = keyof typeof boxVariants.colorStyle;
type BoxBorder = keyof typeof boxVariants.border;
type BoxBorderRadius = keyof typeof boxVariants.boxBorderRadiusStyle;

interface BoxStyle {
    as?: Extract<ElementType, "div" | "section" | "article" | "main">;
    width?: BoxWidth;
    height?: BoxHeight;
    boxShadow?: BoxShadow;
    color?: BoxColor;
    border?: BoxBorder;
    borderRadius?: BoxBorderRadius;
    style?: React.CSSProperties;
    className?: string;
}

interface BoxProps extends BoxStyle, ChildrenOnly {}

export function Box<T extends BoxProps>(
    props: CheckerProps<T, BoxProps, "Box Props Error">
) {
    const {
        as = "div",
        width = "auto",
        height = "auto",
        boxShadow = "none",
        color = "white",
        border = "none",
        borderRadius = "none",
        style,
        className = "",
        children
    } = props;

    const cn = [
        boxVariants.boxWidthStyle[width],
        boxVariants.boxHeightStyle[height],
        boxVariants.boxShadowStyle[boxShadow],
        boxVariants.colorStyle[color],
        boxVariants.border[border],
        boxVariants.boxBorderRadiusStyle[borderRadius],
        className
    ].join(" ");

    const As = as;

    return (
        <As className={cn} style={style}>
            {children}
        </As>
    );
}
