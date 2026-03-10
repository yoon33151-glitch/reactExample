import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ImageIcon } from "lucide-react";
import { usePostEditorModal } from "@/store/postEditorModalStore";
import { useState } from "react";

export default function PostEditorModal() {
const {isOpen, close} = usePostEditorModal();
const handleClose = () => {    close();
}   

const [content, setContent] = useState("");

    return (
       <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent>
            <DialogTitle>게시글 작성</DialogTitle>
             <textarea value={content} onChange={(e) => setContent(e.target.value)} className="w-full h-40 p-4 border rounded-md resize-none" placeholder="나누고 싶은 이야기가 있나요?"></textarea>
             <Button className="mt-4 w-full">
                <ImageIcon/> 이미지 추가</Button>
             <Button>저장</Button>
        </DialogContent>
       </Dialog>
);
}