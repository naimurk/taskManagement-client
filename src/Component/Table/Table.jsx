import useAllTask from "../../Hooks/useAllTask";
import Tr from "./Tr";


const Table = () => {
    const [AllTask, refetch]=useAllTask()
    console.log(AllTask);
    return (
        <div >
            <div className="overflow-x-auto">
                <table  className="table ">
                    {/* head */}
                    <thead className="bg-gray-300 font-bold text-black" >
                        <tr>
                            <th></th>
                            <th>Job Title</th>
                            <th>Status</th>
                            <th>Job Type </th>
                            <th>Company Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {/* <tr>
                            <th>1</th>
                            <td>Cy Ganderton</td>
                            <td>Quality Control Specialist</td>
                            <td>Blue</td>
                        </tr> */}
                        {
                            AllTask && AllTask.map((item, index)=> <Tr
                            key={item?._id}
                            item={item}
                            index={index}
                            >

                            </Tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;