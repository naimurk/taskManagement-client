import Form from "../../Component/Form/Form";
import Table from "../../Component/Table/Table";


const Main = () => {
    return (
        <div>
            <h1 className="lg:text-5xl text-3xl mb-5 font-bold mt-16 lg:mt-32 text-center">Task Management</h1>
            <div className="flex flex-col lg:flex-row min-h-screen justify-center items-center ">
            <div className="lg:w-1/2 w-full px-3 pb-5"><Form></Form></div>
            <div className="lg:w-1/2 w-full border px-3 lg:px-0"><Table></Table></div>
        </div>
        </div>
    );
};

export default Main;