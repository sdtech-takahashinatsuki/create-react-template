import { CheckerProps } from "@/shared/types/object";
import { headingFontStyle } from "./heading.css";
import { textColor, TextTheme } from "@/shared/theme/design-system.css";
import { ChildrenOnly } from "@/shared/types/react";
import { ElementType } from "react";
import classMerger from "@/utils/class-merger";

type HeadingFont = keyof typeof headingFontStyle;

interface HeadingStyle {
    as?: Extract<ElementType, "h1" | "h2" | "h3">;
    fontStyle?: HeadingFont;
    color?: TextTheme;
    style?: React.CSSProperties;
    className?: string;
}

interface HeadingProps extends HeadingStyle, ChildrenOnly {}

export function Heading<T extends HeadingProps>(
    props: CheckerProps<T, HeadingProps, "Heading Props Error">
) {
    const {
        as = "h1",
        fontStyle = "firstBig",
        color = "textNormal",
        style,
        className = "",
        children
    } = props;

    const cn = classMerger([
        headingFontStyle[fontStyle],
        textColor[color],
        className
    ]);

    const As = as;
    return (
        <As className={cn} style={style}>
            {children}
        </As>
    );
}
