import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { db } from "../../firebaseConfig";
import { v4 as uuidv4 } from "uuid";

export default function AddUser() {
  const { register, handleSubmit } = useForm();

  const color = localStorage.getItem("textColor");
  const background = localStorage.getItem("backgroundColor");

  const style = {
    background: background ? background : "#000000",
    color: color ? color : "#ffffff",
  };
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
        className="flex flex-col w-full gap-2"
      >
        <input
          className="border-blue-400 border w-2/5"
          type="text"
          {...register("name")}
        />
        <input
          className="border-blue-400 border w-2/5"
          type="email"
          {...register("email")}
        />
        <select className="border-blue-400 border w-2/5" {...register("role")}>
          <option>Admin</option>
          <option>Staff</option>
          <option>User</option>
        </select>
        <input
          className="border-blue-400 border w-2/5"
          type="password"
          {...register("password")}
        />
        <button style={style} className="w-2/5">
          Register Form
        </button>
      </form>
    </div>
  );
}
