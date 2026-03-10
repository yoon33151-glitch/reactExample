import GlobalLoader from "@/components/ui/global-loader";
import { useProfileData } from "@/hooks/mutations/auth/use-profile-data";
import supabase from "@/lib/supabase";
import { useIsSessionLoad, useSession, useSetSession } from "@/store/session";
import { useEffect, type ReactNode } from "react";

export default function SessionProvider({
    children,
}:{
    children: ReactNode;
}) {
    const session = useSession();
    const {data: profileData, isLoading: isProfileDataLoading} = useProfileData(session?.user.id || "");

    const isSessionLoaded = useIsSessionLoad();
      const setSession = useSetSession();
      useEffect(()=>{
        supabase.auth.onAuthStateChange((event,seession)=>{
          setSession(seession)
        })
        return ()=>{}
      },[])
      
      if(!isSessionLoaded) return <GlobalLoader/>
      if(isProfileDataLoading) return <GlobalLoader/>
      return children
}