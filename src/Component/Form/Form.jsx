
import { useForm } from "react-hook-form";
import useAllTask from "../../Hooks/useAllTask";
import Swal from "sweetalert2";

const Form = () => {
  
  const [AllTask, refetch]=useAllTask()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();


  const onSubmit = (data) => {

   console.log(data);

    fetch("https://task-management-server-eosin.vercel.app/addJob",{
        method: "POST",
        headers: {
            "content-type" : "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
      if(data.acknowledged){
        refetch()
        reset()
        Swal.fire(
          'Added Successfully!',
          'Your item has been added.',
          'success'
      )
      }
    })
  };
  return (
    <div className="max-w-md  mx-auto bg-gray-300 p-12">
    
    <div className="max-w-md  mx-auto">
      <form  onSubmit={handleSubmit(onSubmit)}>
        {/* Title */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            {...register("title", { required: true })}
            type="text"
            id="title"
            className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {errors.title && <span className="text-red-500">This field is required</span>}

        {/* Description */}
        <div className="mb-4">
    <label className="block text-gray-700 font-bold mb-2" htmlFor="description">
        Description
    </label>
    <textarea
        {...register("description", { required: true })}
        id="description"
        className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        rows={4} // Specify the number of visible rows
    />
</div>

        {errors.description && <span className="text-red-500">This field is required</span>}

        {/* Status */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Status</label>
          <div>
            <input
              {...register("status", { required: true })}
              value={"closed"}
              type="radio"
              id="closed"
              className="mx-2"
            />
            <label htmlFor="closed" className="mr-4">
              Closed
            </label>
            <input
              {...register("status", { required: true })}
              value={"opened"}
              type="radio"
              id="opened"
              className="mx-2"
            />
            <label htmlFor="opened">Opened</label>
          </div>
        </div>
        {errors.status && <span className="text-red-500">This field is required</span>}

        {/* Job Type */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Job Type</label>
          <div>
            <input
              {...register("jobType", { required: true })}
              value={"onsite"}
              type="radio"
              id="onsite"
              className="mx-2"
            />
            <label htmlFor="onsite"  className="mr-4">
              Onsite
            </label>
            <input
              {...register("jobType", { required: true })}
              value={"remote"}
              type="radio"
              id="remote"
              className="mx-2"
            />
            <label htmlFor="remote">Remote</label>
          </div>
        </div>
        {errors.jobType && <span className="text-red-500">This field is required</span>}

        {/* Example Required */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="companyName">
            Company Name
          </label>
          <input
            {...register("companyName", { required: true })}
            id="companyName"
            className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {errors.companyName && <span className="text-red-500">This field is required</span>}

        <input
        type="submit"
        value={"Add Task"}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        />
      </form>
    </div>

    </div>
  );
};

export default Form;
