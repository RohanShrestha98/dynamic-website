/* eslint-disable react/prop-types */
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { db } from "../../firebaseConfig";
import Table from "../../myComponents/table";

export default function Category() {
  const [data, setData] = useState();
  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "category"));
    const data = querySnapshot.docs.map((doc) => doc.data());
    setData(data);
  };
  useEffect(() => {
    getData();
  }, [data]);
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "auth", id));
  };

  const handleUpdate = async (data) => {
    console.log("data", data);
    await updateDoc(doc(db, "auth", data.id), {
      name: "Hello",
      updateDate: serverTimestamp(),
    });
  };
  const columns = useMemo(
    () => [
      {
        accessorFn: (_, index) => index + 1,
        id: "serialNo",
        cell: (info) => <div className="ml-5">{info.getValue()}</div>,
        header: () => <span className="ml-5">S/N</span>,
        // eslint-disable-next-line react/prop-types
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row?.name,
        // console.log(row);
        id: "title",
        cell: (info) => info.getValue(),
        header: () => <span>Name</span>,
        // eslint-disable-next-line react/prop-types
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row?.email,
        id: "openDate",
        cell: (info) => info.getValue(),
        header: () => <span>Email</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row?.role,
        id: "dueDate",
        cell: (info) => info.getValue(),
        header: () => <span>Role</span>,
        footer: (props) => props.column.id,
      },
      {
        id: "actions",
        header: () => <>Actions</>,
        cell: ({ row }) => (
          <div className="flex  gap-4">
            <div
              className="cursor-pointer"
              onClick={() => handleUpdate(row.original)}
            >
              Edit
            </div>
            <div
              className="cursor-pointer"
              onClick={() => handleDelete(row.original.id)}
            >
              Delete
            </div>
          </div>
        ),
      },
    ],
    []
  );
  return (
    <div>
      <Table data={data || []} columns={columns} />
    </div>
  );
}
