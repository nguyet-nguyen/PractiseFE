import React from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateUserAvatar } from "../../../../features/Api";
import CustomPopupMessage from "../../../CustomPopupMess";

const ModalUpdateAvatar = ({ userInfo }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onUpdateAvatar = async (data, e) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);

    updateUserAvatar(userInfo.id, formData)
      .then((response) => {
        console.log(response.data);
        $("#modalUpdateAvatar").modal("hide");
        toast(<CustomPopupMessage mess="Update avatar successfully!" icon="check"/>);
      })
      .catch((err) => {
        alert(err.data);
      });

    e.target.reset();
  };

  return (
    <>
      {/* <!-- Modal Update Avatar --> */}
      <div
        className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
        id="modalUpdateAvatar"
        tabIndex="-1"
        aria-labelledby="modalUpdateAvatarLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-md modal-dialog-centered modal-dialog-scrollable relative w-auto pointer-events-none">
          <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
              <h5
                className="text-xl font-medium leading-normal pl-8 text-gray-800"
                id="modalUpdateAvatarLabel"
              >
                Change User Profile Avatar
              </h5>
              <button
                type="button"
                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form
              className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8"
              onSubmit={handleSubmit(onUpdateAvatar)}
            >
              <div className="modal-body relative p-4">
                <div className="flex -mx-3">
                  <div className="w-full px-3">
                        <label htmlFor="" className="text-xs font-semibold px-1">
                            Avatar
                        </label>
                        <div className="flex items-center justify-center w-full">
                            <label
                                className="flex flex-col w-full h-20 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                                <div className="flex flex-col items-center justify-center pt-2">
                                    <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                        Attach a file</p>
                                </div>
                                <input id="image" name="image" accept=".jpg, .png" type="file"
                                {...register('image',{required: true})}
                                        className={`ml-8 text-sm  ${errors.image && "border-red-600 focus:ring-red-500 focus:border-red-600 border-1"}`}/>
                            </label>
                        </div>
                        {errors.image && errors.image.type === "required" &&
                            <p className="mt-3 text-red-500 text-sm italic">* Image required</p>}
                    </div>
                </div>
              
              </div>
              <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                <button
                  type="button"
                  className="inline-block px-6 py-2.5 bg-gray-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="inline-block px-6 py-2.5 bg-amber-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-amber-600 hover:shadow-lg focus:bg-amber-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-amber-700 active:shadow-lg transition duration-150 ease-in-out ml-1"
                >
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ModalUpdateAvatar;
