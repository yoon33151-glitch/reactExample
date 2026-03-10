import supabase from "@/lib/supabase";

export async function createPost({content}:{content:string}) {
    const response = await supabase.from("post").insert({content});
    
    if(response.error) throw response.error;
    return response.data;
}   