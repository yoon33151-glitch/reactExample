import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ImageIcon } from "lucide-react";
import { usePostEditorModal } from "@/store/postEditorModalStore";
import { useState } from "react";
import { useCreatePost } from "@/hooks/mutations/post/use-create-post";
import { toast } from "sonner";

export default function PostEditorModal() {
const {isOpen, close} = usePostEditorModal();
const handleClose = () => {    close();
}   
const {mutate, isPending} = useCreatePost({onSuccess:() => {
        setContent("");
        close();
    },onError:(error) => {        console.error(error);
        toast.error("게시글 작성에 실패했습니다. 다시 시도해주세요.");
    }}  );    




const [content, setContent] = useState("");

    return (
       <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent>
            <DialogTitle>게시글 작성</DialogTitle>
             <textarea disabled={isPending} value={content} onChange={(e) => setContent(e.target.value)} className="w-full h-40 p-4 border rounded-md resize-none" placeholder="나누고 싶은 이야기가 있나요?"></textarea>
             <Button disabled={isPending} className="mt-4 w-full">
                <ImageIcon/> 이미지 추가</Button>
             <Button disabled={isPending} onClick={() => mutate({content})}>
                저장
             </Button>
        </DialogContent>
       </Dialog>
);
}