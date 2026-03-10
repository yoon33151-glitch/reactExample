import { signIn } from "@/api/auth";
import { createProfile, fetchProfile } from "@/api/profile";
import { QUERY_KEY } from "@/lib/constants";
import { useSession } from "@/store/session";
import type { UseMutationCallback } from "@/types";
import type { PostgrestError } from "@supabase/supabase-js";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export function useProfileData(userId: string) {
    const session = useSession();
    const isMine = session?.user.id === userId;
    return useQuery({
        queryKey: QUERY_KEY.profile.byId(userId),
        queryFn: async() => {
            try {
                const data = await fetchProfile(userId!);
                return data;
            }catch(error) {
                if(isMine && (error as PostgrestError).code === "PGRST116") {
                    toast.error("프로필이 존재하지 않습니다. 프로필을 생성해주세요.");
                    return await createProfile(userId!)
                }
                toast.error("프로필 데이터를 불러오는데 실패했습니다.");
                throw error;            
        }
    },
        enabled: !!userId,
               
    })
}