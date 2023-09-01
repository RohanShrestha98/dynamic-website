import { useForm } from "react-hook-form";
import Button from "../../myComponents/Button";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { db, storage } from "../../firebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import InputField from "../../myComponents/InputField";
import TextArea from "../../myComponents/TextArea";

export default function AddCategory() {
  const { register, handleSubmit } = useForm();
  const myUUID = uuidv4();
  const [images, setImages] = useState();

  const uploadFiles = async () => {
    const downloadUrls = [];
    for (let i = 0; i < images.length; i++) {
      const imageRef = ref(storage, `/categoryThumbnail/${images[i].name}`);

      try {
        const snapshot = await uploadBytesResumable(imageRef, images[i]);
        const downloadURL = await getDownloadURL(snapshot.ref);
        downloadUrls.push(downloadURL);
        console.log("Image uploaded:", downloadURL);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
    return downloadUrls;
  };

  const handleImageRemove = (key) => {
    const updatedFileList = { ...images };
    delete updatedFileList[key];
    setImages(updatedFileList);
  };

  const fileList =
    Object &&
    Object?.keys(images !== undefined && images)
      .filter((key) => !isNaN(parseInt(key)))
      .map((key) => {
        const file = images !== undefined && images[key];
        const imageUrl = URL.createObjectURL(file);
        return (
          <div
            key={key}
            className="w-28 h-32 flex flex-col items-center justify-center border bg-gray-50 border-gray-500 rounded-md"
          >
            <img
              src={imageUrl}
              alt={file.name}
              className="w-full object-fill h-full"
            />
            <p
              className="cursor-pointer border rounded-full absolute  w-6 h-6 text-center top-0 bg-red-600 text-white"
              onClick={() => handleImageRemove(key)}
            >
              +
            </p>
          </div>
        );
      });

  const handleAdd = async (data, uuid) => {
    console.log("data", data);
    try {
      const imageUrls = await uploadFiles();
      await setDoc(doc(db, "category", uuid), {
        ...data,
        id: uuid,
        createdDate: serverTimestamp(),
        images: imageUrls,
      });
      console.log("Category thumbnail and images added successfully!");
    } catch (err) {
      console.log("Error adding Category thumbnail:", err);
    }
  };
  return (
    <div className="p-4 bg-slate-50 h-[92vh]">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-semibold">Add Category </p>
        <div className="w-40">{/* <Button title={"Add Category"} /> */}</div>
      </div>
      <form onSubmit={handleSubmit((e) => handleAdd(e, myUUID))}>
        <div className="flex flex-grow gap-4 mt-4">
          <div className="w-1/4 flex h-52 bg-white flex-col gap-6">
            <div className="border bg-white w-full  rounded-lg p-4">
              <h1 className="font-medium text-xl mb-2">Thumbnail</h1>
              <p className="mb-2">Photo</p>
              <div className="flex flex-col items-center border border-dashed p-12 rounded-md">
                <div className=" flex gap-3 mb-4">
                  {images &&
                    fileList?.map((item) => {
                      return <div key={item}> {item}</div>;
                    })}
                </div>
                {!images && (
                  <p className="mb-2 text-sm text-center">
                    You can select images here
                  </p>
                )}
                {!images && (
                  <>
                    <label
                      htmlFor="images"
                      className="cursor-pointer border bg-gray-50 px-4 py-1 rounded-md"
                    >
                      Add Thumbnail
                    </label>
                    <input
                      id="images"
                      type="file"
                      className="hidden"
                      onChange={(event) => {
                        setImages(event.target.files);
                      }}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="w-3/4 flex bg-white flex-col gap-6">
            <div className="border bg-white w-full  rounded-lg p-4">
              <h1 className="font-medium text-xl mb-2">General Information</h1>
              <InputField
                placeholder={"Enter the category name"}
                registerName={"category_name"}
                label={"Category Name"}
                type={"text"}
                classes={"bg-[#f9f9fcff] h-10 border"}
                register={register}
              />
              <TextArea
                className={"mt-4"}
                placeholder={"Enter the category description here ..."}
                registerName={"category_description"}
                label={"Category Description"}
                type={"textarea"}
                classes={"bg-[#f9f9fcff] h-32 border"}
                register={register}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div></div>
          <div className="w-40 mt-4">
            <Button title={"Add Category"} />
          </div>
        </div>
      </form>
    </div>
  );
}
