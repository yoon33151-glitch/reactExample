import { resetPassword } from "@/api/auth";
import type { UseMutationCallback } from "@/types";
import { useMutation } from "@tanstack/react-query";

export function useRequestPassword(callbacks?:UseMutationCallback) {
    return useMutation({
        mutationFn:resetPassword,
        onError:(error) =>{
            if(callbacks?.onError) callbacks.onError(error)
        },
        onSuccess:() =>{
            if(callbacks?.onSuccess) callbacks.onSuccess()      
        }
    })
   
}