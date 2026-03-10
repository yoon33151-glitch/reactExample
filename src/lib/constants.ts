export const QUERY_KEY = {
    profile:{
        all:["profile"],
        list:["profile","list"],
        byId:(userId:string)=>["profile","byId",userId],
    },
}        