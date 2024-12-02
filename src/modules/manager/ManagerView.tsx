import { useAppDispatch, useAppSelector } from "@/store/index";
import { getAllSalesWithProducts, getSalesWithDate } from "@/api/sale/queries";
import DataTable from "@/components/table/DataTable"; 
import { columns } from "./table/columns"; 
import { DatePickerWithRange } from "./chunks/datePicker";
import { useState } from "react";

const ManagerView = () => {
  const dispatch = useAppDispatch();
  const { data: allSalesData, isLoading, error } = getAllSalesWithProducts.useQuery();

  const [dateRange, setDateRange] = useState<{ startDate: Date | null; endDate: Date | null } | null>(null);

  const { data: filteredSalesData } = getSalesWithDate.useQuery(
    dateRange
      ? { startDate: dateRange.startDate?.toISOString() ?? "", endDate: dateRange.endDate?.toISOString() ?? "" }
      : { startDate: "", endDate: "" },
    {
      enabled: !!dateRange?.startDate && !!dateRange?.endDate, 
    }
  );
  const handleDateChange = (range: { startDate: Date | null; endDate: Date | null }) => {
    setDateRange(range);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const displayData = dateRange ? filteredSalesData : allSalesData;

  return (
    <div className="container mx-auto py-10 px-5 relative">
      <h4 className="text-lg font-semibold mb-4">Sales Page</h4>
      <div className="py-4">
        <h2 className="flex flex-col items-end text-lg font-bold">Select a Date</h2>
        <DatePickerWithRange
          className="flex flex-col items-end"
          onChange={handleDateChange}
        />
      </div>
      <DataTable columns={columns} data={displayData || []} />
    </div>
  );
};

export default ManagerView;
