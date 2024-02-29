import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure
} from "../redux/user/userSlice";
import { app } from "../firebase";
export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(null);
  const [filePercent, setFilePercent] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercent(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  const handleDeleteUser = async (e) => {
    setOpenModal(false);
    try {
        dispatch(deleteUserStart());
        const res = await fetch(`/api/user/delete/${currentUser._id}`, {
          method:'DELETE',
        });
        const data = await res.json();
        if(data.success === false) {
          dispatch(deleteUserFailure(data.message));
          return;
        } else {
          dispatch(deleteUserSuccess(data));
        }
    } catch(error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="gap-4 flex flex-col" onSubmit={handleSubmit}>
        <input
          type="file"
          ref={fileRef}
          accept="image/*"
          hidden
          onChange={(e) => setFile(e.target.files[0])}
        />
        <img
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          className=" mt-5 rounded-full h-24 w-24 object-cover hover:cursor-pointer self-center"
          onClick={() => fileRef.current.click()}
        />
        <p className="text-sm text-center">
          {fileUploadError ? (
            <span className="text-red-700">
              Error Image Upload (image must be less than 2MB)
            </span>
          ) : filePercent > 0 && filePercent < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePercent}`}</span>
          ) : filePercent === 100 ? (
            <span className="text-green-700">Image successfully uploaded!</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          id="username"
          placeholder="Update your username"
          defaultValue={currentUser.username}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />
        <input
          type="email"
          id="email"
          placeholder="Update your email address"
          defaultValue={currentUser.email}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />
        <input
          type="password"
          id="password"
          placeholder="Update your password"
          defaultValue={currentUser.password}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />
        <button
          disabled={loading}
          className="bg-slate-700 uppercase p-3 hover:opacity-95 rounded-lg disabled:opacity-80"
        >
          {loading ? "Loading" : "Update"}
        </button>
      </form>
      <p className="text-red-700">{error ? error : ""}</p>
      <p className="text-green-700 mt-2 text-center">
        {setUpdateSuccess ? "User is updated successfully" : ""}
      </p>
      <div className="flex justify-between gap-4 mt-4">
        <Button
        color="failure"
          onClick={() => setOpenModal(true)}
          className="bg-red-500 hover:bg-red-600"
        >
          Delete Account
        </Button>
        <Modal
          popup
          size="md"
          show={openModal}
          onClose={() => setOpenModal(false)}
        >
          <Modal.Header />
          <Modal.Body>
          <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />

            <h1 className="text-center text-2xl">
              Are you sure you want to delete your account?
            </h1>
            <div className="flex justify-between gap-4 mt-5">
              <Button
              color="failure"
                onClick={handleDeleteUser}
                className="bg-red-500  text-white hover:bg-red-600"
              >
                Yes, I'm sure.
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, Cancel.
              </Button>
            </div>
          </Modal.Body>
        </Modal>
        <Button color="failure"  className="bg-red-500 hover:bg-red-600 opacity-90 text-2xl">
          Sign Out
        </Button>
      </div>
    </div>
  );
}
