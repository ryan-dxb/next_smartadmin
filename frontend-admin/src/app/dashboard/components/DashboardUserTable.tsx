import { NextPage } from "next";
import { Payment, columns } from "@/components/Datatable/DataTableColums";
import { DataTable } from "@/components/Datatable/DataTable";

interface DashboardUserTableProps {}

const data = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "728ed5dsfgdsf",
    amount: 200,
    status: "success",
    email: "m@test.com",
  },
];

const DashboardUserTable: NextPage<DashboardUserTableProps> = () => {
  return (
    <div className="container py-10 mx-auto">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default DashboardUserTable;
