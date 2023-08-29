import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { db } from "../../firebaseConfig";
import { v4 as uuidv4 } from "uuid";
import Button from "../../myComponents/Button";
import InputField from "../../myComponents/InputField";

export default function AddUser() {
  const { register, handleSubmit } = useForm();
  const myUUID = uuidv4();

  const handleAdd = async (data, uuid) => {
    await setDoc(doc(db, "auth", uuid), {
      data,
      id: uuid,
      createdDate: serverTimestamp(),
    });
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit((e) => handleAdd(e, myUUID))}
        className="flex flex-col w-2/5 gap-2"
      >
        <InputField
          type={"text"}
          registerName={"name"}
          placeholder={"Enter your name"}
        />
        <InputField
          type={"email"}
          registerName={"email"}
          placeholder={"Enter your email"}
        />
        <select className="border-blue-400 border" {...register("role")}>
          <option>Admin</option>
          <option>Staff</option>
          <option>User</option>
        </select>
        <InputField
          type={"password"}
          registerName={"password"}
          placeholder={"Enter your password"}
        />
        <Button title={"Register"} className="w-2/5" />
      </form>
    </div>
  );
}
