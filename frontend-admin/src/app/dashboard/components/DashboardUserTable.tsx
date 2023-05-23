import { DataTable } from "@/components/Datatable/DataTable";
import { columns } from "@/components/Datatable/DataTableColums";
import { NextPage } from "next";
import { useMemo } from "react";
interface DashboardUserTableProps {}

const data = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "728ed5sd4f",
    amount: 200,
    status: "success",
    email: "m2@example.com",
  },
  // ...
];

const DashboardUserTable: NextPage<DashboardUserTableProps> = () => {
  return (
    <div className="container py-10 mx-auto">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default DashboardUserTable;
