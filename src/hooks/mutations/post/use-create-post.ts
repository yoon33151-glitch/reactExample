import { createPost } from "@/api/post";
import type { UseMutationCallback } from "@/types";
import { useMutation } from "@tanstack/react-query";

export function useCreatePost(callbacks?:UseMutationCallback) {
    return useMutation({
        mutationFn:createPost,
        onError:(error) =>{
            if(callbacks?.onError) callbacks.onError(error)
        },
        onSuccess:() =>{
            if(callbacks?.onSuccess) callbacks.onSuccess()      
        }   
    })
}