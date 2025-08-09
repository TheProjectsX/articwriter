import type { CSSProperties } from "react";

type AllTypes =
    | "heading"
    | "paragraph"
    | "list"
    | "divider"
    | "code"
    | "quote"
    | "image"
    | "html-preview"
    | "table";

// Plugin Props
export type PluginProps = {
    className: string;
    style?: Record<string, string>;
    tag: string;
    data: Record<string, any>;
};

// Plugin Type
export type PluginType = {
    type: "string";
    component: React.FC<PluginProps>;
};

export type UserConfig = Record<
    AllTypes,
    {
        className?: string;
        style?: CSSProperties;
    }
>;

export interface RendererProps {
    plugins?: PluginType[] | any[];
    config?: UserConfig;
}

export type RendererReturn = [React.FC<{ blocks: any[] }>];

declare const Renderer: (props?: RendererProps) => RendererReturn;

export default Renderer;
