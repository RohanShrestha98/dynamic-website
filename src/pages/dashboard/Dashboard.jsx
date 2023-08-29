/* eslint-disable react/prop-types */
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { db } from "../../firebaseConfig";
import Table from "../../myComponents/table";
import { createColumnHelper } from "@tanstack/react-table";
const columnHelper = createColumnHelper();

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

  // console.log("data", data);
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
        accessorFn: (row) => row.data.name,
        // console.log(row);
        id: "title",
        cell: (info) => info.getValue(),
        header: () => <span>Name</span>,
        // eslint-disable-next-line react/prop-types
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.data.email,
        id: "openDate",
        cell: (info) => info.getValue(),
        header: () => <span>Email</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.data.role,
        id: "dueDate",
        cell: (info) => info.getValue(),
        header: () => <span>Role</span>,
        footer: (props) => props.column.id,
      },
    ],
    []
  );

  const columnsAction = useMemo(
    () => [
      columnHelper.display({
        id: "actions",
        header: () => <>Actions</>,

        cell: ({ row }) => (
          <div className="flex items-center gap-4">
            Edit
            <span
              onClick={() => handleDelete(row.original.id)}
              className="flex cursor-pointer items-center text-grayHeading hover:text-dangerDark"
            >
              Delete
            </span>
          </div>
        ),
      }),
    ],
    [data]
  );
  return (
    <div>
      Dashboard
      <div>
        <Table data={data || []} columns={columns.concat(columnsAction)} />
      </div>
    </div>
  );
}
