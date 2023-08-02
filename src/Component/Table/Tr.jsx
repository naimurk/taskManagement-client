import { useState } from "react";
import Modal from 'react-modal';
import useAllTask from "../../Hooks/useAllTask";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";


const Tr = ({ item, index }) => {
    const [AllTask, refetch] = useAllTask()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const { _id, title, description, status, jobType, companyName } = item
    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);
    const [id, setId] = useState("")



    // delete item
    const handleDelete = (id) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to delete this ?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/delete/${id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            refetch()
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    })
            }
        })






    }



    // form data 
    const onSubmit = (data) => {

        fetch(`http://localhost:5000/update/${id}`, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    refetch()
                    reset()
                    closeModal()
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Updated Successfully',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })


    };


    const customStyles = {
        content: {
            top: '50%',
            width: '50%', // Default width for larger screens
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
        '@media (max-width: 768px)': {
            content: {
                width: '100%',
            },
        },
    };


    if (window.innerWidth <= 768) {
        customStyles.content.width = '100%';
    }





    function openModal(id) {

        setId(id)
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }
    return (



        <tr>
            <th>{index + 1}</th>
            <td>{title}</td>
            <td>{status}</td>
            <td>{jobType}</td>
            <td>{companyName}</td>
            <td className="">

                <button onClick={() => handleDelete(_id)} className="border-2 px-4 py-2 bg-red-500 rounded-md text-white mx-2">delete</button>
                <button className="px-4 mx-2 my-2 rounded-md py-2 bg-sky-500 text-white" onClick={() => openModal(_id)}>Update</button>

                <div>

                    <Modal
                        isOpen={modalIsOpen}
                        onAfterOpen={afterOpenModal}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                    >
                        {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
                        <button className="btn btn-warning mb-3" onClick={closeModal}>close</button>

                        <form onSubmit={handleSubmit(onSubmit)}>
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
                                <input
                                    {...register("description", { required: true })}
                                    type="text"
                                    id="description"
                                    className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                                    <label htmlFor="onsite" className="mr-4">
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
                                value={"Edit Task"}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            />
                        </form>
                    </Modal>
                </div>



            </td>
        </tr>










    );
};

export default Tr;