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

// Plugin Structure
export type PluginStructure = Omit<BlockStructure, "data"> & {
    data: Record<string, any>;
};

// Plugin Demo
export type PluginDemo = {
    type: string;
    tag: string;
    data: Record<string, any>;
};

// Plugin Props
export type PluginProps = {
    className?: string;
    tag?: string;
    data: Record<string, any>;
    onUpdate: (value: any) => void;
};

// Plugin type
export type PluginType = {
    component: React.FC<PluginProps>;
    structure: PluginStructure;
    demo: PluginDemo;
    settings?: SettingsStructure[];
    processor?: (block: Record<string, any>) => Promise<Record<string, any>>;
};

export type UserConfig = {
    uploadImage?: (file: File) => Promise<string>;
};

export interface EditorProps {
    blocks?: any[];
    defaultBlock?: AllTypes | (string & {});
    plugins?: PluginType[] | any[];
    config?: UserConfig;
}

export type EditorReturn = [React.FC, () => Promise<Record<string, any>[]>];

declare const Editor: (props?: EditorProps) => EditorReturn;

export default Editor;
