import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";

export default function Dashboard() {
  const [data, setData] = useState();
  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "auth"));
    const data = querySnapshot.docs.map((doc) => doc.data());
    setData(data);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "auth", id));
  };

  useEffect(() => {
    getData();
  }, [data]);
  return (
    <div>
      Dashboard
      <div>
        {data?.map((item) => {
          return (
            <div key={item?.id} className="flex gap-3">
              <p>{item.data.name}</p>
              <p>{item.data.email}</p>
              <p>{item.data?.role}</p>
              <button onClick={() => handleDelete(item?.id)}>Remove</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
