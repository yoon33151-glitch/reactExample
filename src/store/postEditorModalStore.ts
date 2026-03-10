import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

const initialState = {
  isOpen: false,
};

const usePostEditorModalStore = create(
  devtools(
    combine(initialState, (set) => ({
        action:{
            open: () => set({ isOpen: true }),
            close: () => set({ isOpen: false }),
        }
    })),
    { name: "postEditorModalStore" }
  )
);

export const useOpenPostEditorModal = () => {
    const open =usePostEditorModalStore((store) => store.action.open);
    return open
}
export const usePostEditorModal = () => {
    const { isOpen, action : { open, close }, } = usePostEditorModalStore((store) => store);
    
    return { isOpen, open, close };
};

