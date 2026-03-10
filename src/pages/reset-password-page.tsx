import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUpdatePassword } from "@/hooks/mutations/auth/use-update-password";
import { generateErrorMessage } from "@/lib/error";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function ResetPasswordPage() {
    const navigate = useNavigate()
    const [password, setPassword] = useState("");
    const { mutate: resetPassword, isPending: isResettingPasswordPending } = useUpdatePassword({
            onError:(error) =>{
                console.error(error)
                const message =generateErrorMessage(error);
                toast.error(message, {
                    position:"top-center"
                })
                setPassword("")
            },
            onSuccess:() =>{
                toast.success("비밀번호가 성공적으로 변경되었습니다.", {
                    position:"top-center"
                })
                navigate("/");
            }

    })
    const handleResetPasswordClick=()=>{
        if(password.trim()==="") return ;   
        resetPassword(password)
        setPassword("")
    }
     return (<div className="flex flex-col gap-8">
        <div className="flexflex-col gap-1">
            <div className="text-xl font-bold">비밀번호 재설정</div>
            <div className="text-muted-foreground">
                비밀번호 입력하셔요.
            </div>
        </div>
        <Input value={password} onChange={(e) => setPassword(e.target.value)} className="py-6" placeholder="새 비밀번호"></Input>
        <Button className="w-full" onClick={handleResetPasswordClick} disabled={isResettingPasswordPending}>
            비밀번호 변경
        </Button>
    </div>)
}