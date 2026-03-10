import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Link} from "react-router"
import {useState} from "react"
import {useSignInWithPassword } from "@/hooks/mutations/auth/use-sign-in-with-password";
import {useSignInWithoauth} from "@/hooks/mutations/auth/use-sign-in-with-oauth";
import githubLogo from "@/assets/github-mark.svg"
import { toast } from "sonner";
import { generateErrorMessage } from "@/lib/error";

export default function SignInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {mutate:signIn, isPending: isSignInWithPasswordPending} =useSignInWithPassword({
        onError:(error)=>{
            const message = generateErrorMessage(error);
               toast.error(message, {
                position : "top-center"
            })
            setPassword("")
        }
    });
    const {mutate:signInWithOAuth,  isPending: isSignInWithOAuthPending} = useSignInWithoauth({
        onError:(error)=>{
            const message = generateErrorMessage(error);
               toast.error(message, {
                position : "top-center"
            })
            setPassword("")
        }
    });
    
    const handleSignInWithPasswordClick=()=>{
        if(email.trim()==="") return ;
        if(password.trim()==="") return ;

        signIn({
            email,password
        })
        
    }

    const handleSignInWithOAuthClick=()=>{
        signInWithOAuth('github')
        
    }
    
    const isPending = isSignInWithOAuthPending || isSignInWithPasswordPending
    return(<><div className="flex flex-col gap-8">
            <div className="text-xl font-bold">로그인</div>
            <div className="flex flex-col gap-2">
                <Input disabled={isPending} value={email} onChange={(e)=>setEmail(e.target.value)} className="py-6" type="email"></Input>
                <Input disabled={isPending} value={password} onChange={(e)=>setPassword(e.target.value)} className="py-6" type="password"></Input>
            </div>
            <div>
                <Button disabled={isPending} onClick={handleSignInWithPasswordClick} className="w-full">로그인</Button>
                <Button disabled={isPending} onClick={handleSignInWithOAuthClick} className="w-full" variant={'outline'}>
                    <img src={githubLogo} className="h-4 w-4"></img>GIT로그인</Button>
            </div>
            <div className="flex flex-col gap-2">
                <Link className="texte-muted-foreground hover:underline" to={"/sign-up"}>계정이 없으시다면? 회원가입</Link>
                <Link className="texte-muted-foreground hover:underline" to={"/forget-password"}>비밀번호를 잊으셨나요?</Link>
            </div>

        </div>
        
        </>)
}