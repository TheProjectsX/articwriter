import type { blockState } from "../../App";
import { uploadToImgbb } from "../../util";
import Editor from "articwriter/editor";

const EditorComponent = ({
    defaultBlock,
    blocks = [],
    setBlocks,
}: {
    defaultBlock?: string;
    blocks?: { blocks: Record<string, any>[] } | Record<string, any>[];
    setBlocks: React.Dispatch<React.SetStateAction<blockState>>;
}) => {
    const [Component, save] = Editor({
        initials: blocks,
        defaultBlock: defaultBlock ?? "paragraph",
        config: {
            enableTableOfContents: true,
            uploadImage: uploadToImgbb,
        },
    });

    return (
        <section className="max-w-3xl w-full">
            <div className="bg-white dark:bg-slate-900 rounded-2xl w-full p-6 pb-1.5 mb-5">
                <Component />
            </div>

            <div className="flex justify-center items-center gap-4">
                <button
                    className="px-6 py-2.5 rounded-lg bg-[dodgerBlue] text-white cursor-pointer"
                    onClick={async () => {
                        setBlocks({ blocks: [], tableOfContent: [] });
                    }}
                >
                    Clear
                </button>
                <button
                    className="px-6 py-2.5 rounded-lg bg-[dodgerBlue] text-white cursor-pointer"
                    onClick={async () => {
                        const data = await save();
                        console.log("🚀 ~ onClick={ ~ data:", data);
                        setBlocks(data);
                    }}
                >
                    Save
                </button>
            </div>
        </section>
    );
};

export default EditorComponent;
