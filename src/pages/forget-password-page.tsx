import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRequestPassword } from "@/hooks/mutations/auth/use-request-password";
import { generateErrorMessage } from "@/lib/error";
import { useState } from "react";
import { toast } from "sonner";

export default function ForgetPasswordPage() {
    const [email, setEmail] = useState("");

    const { mutate: requestPassword, isPending: isRequestingPasswordPending } = useRequestPassword({
        onError: (error) => {
            const message = generateErrorMessage(error);
           toast.error(message, {
                position: "top-center"
            })
            setEmail("");
        },
        onSuccess: () => {
            toast.info("인증링크가 이메일로 전송되었습니다. 이메일을 확인해주세요.", {
                position: "top-center"
            })
            setEmail("");
        }   
    });
    const handleSendResetPasswordLinkClick=()=>{
        if(email.trim()==="") return ;
        requestPassword({email})
     
    }
    return (<div className="flex flex-col gap-8">
        <div className="flexflex-col gap-1">
            <div className="text-xl font-bold">비밀번호를 잊으셨나요?</div>
            <div className="text-muted-foreground">
                이메일로 비밀번호를 재설정할 수 있는 인증링크를 보내드립니다.
            </div>s
        </div>
        <Input disabled={isRequestingPasswordPending} value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        className="py-6" 
        placeholder="이메일"></Input>
        <Button disabled={isRequestingPasswordPending} 
        onClick={handleSendResetPasswordLinkClick}
        className="w-full">인증링크 보내기</Button>
        </div>)
}

