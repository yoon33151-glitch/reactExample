import GlobalLoader from "@/components/ui/global-loader";
import supabase from "@/lib/supabase";
import { useIsSessionLoad, useSetSession } from "@/store/session";
import { useEffect, type ReactNode } from "react";

export default function SessionProvider({
    children,
}:{
    children: ReactNode;
}) {
    const isSessionLoaded = useIsSessionLoad();
      const setSession = useSetSession();
      useEffect(()=>{
        supabase.auth.onAuthStateChange((event,seession)=>{
          setSession(seession)
        })
        return ()=>{}
      },[])
      
      if(!isSessionLoaded) return <GlobalLoader/>
      return children
}