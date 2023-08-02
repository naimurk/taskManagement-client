import { useQuery } from "@tanstack/react-query";


const useAllTask = () => {
    const {data : AllTask=[], refetch } = useQuery({
        queryKey: ["AllTask"],
        queryFn: async ()=> {
            const res = await fetch("http://localhost:5000/all-taskList")
            return res.json();
        }
    })
    return [AllTask, refetch]
   
};

export default useAllTask;