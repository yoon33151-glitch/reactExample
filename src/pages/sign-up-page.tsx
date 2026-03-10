import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Link} from "react-router"
import {useState} from "react"
import {useSignUp } from "@/hooks/mutations/auth/use-sign-up";
import { toast } from "sonner";
import { generateErrorMessage } from "@/lib/error";

export default function SignUpPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {mutate:signUp, isPending: isSignUpPending} =useSignUp({
        onError:(error)=>{
            const message = generateErrorMessage(error);
               toast.error(message, {
                position : "top-center"
            })
            setPassword("")
        }
    });
    
    const handleSignUpClick=()=>{
        if(email.trim()==="") return ;
        if(password.trim()==="") return ;

        signUp({
            email,password
        })
        
    }
    return(<><div className="flex flex-col gap-8">
            <div className="text-xl font-bold">회원가입</div>
            <div className="flex flex-col gap-2">
                <Input disabled={isSignUpPending} value={email} onChange={(e)=>setEmail(e.target.value)} className="py-6" type="email"></Input>
                <Input disabled={isSignUpPending} value={password} onChange={(e)=>setPassword(e.target.value)} className="py-6" type="password"></Input>
            </div>
            <div>
                <Button disabled={isSignUpPending} onClick={handleSignUpClick} className="w-full">회원가입</Button>
            </div>
        </div>
        
        </>)
}


