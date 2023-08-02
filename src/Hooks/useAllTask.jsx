import { useQuery } from "@tanstack/react-query";


const useAllTask = () => {
    const {data : AllTask=[], refetch } = useQuery({
        queryKey: ["AllTask"],
        queryFn: async ()=> {
            const res = await fetch("https://task-management-server-eosin.vercel.app/all-taskList")
            return res.json();
        }
    })
    return [AllTask, refetch]
   
};

export default useAllTask;