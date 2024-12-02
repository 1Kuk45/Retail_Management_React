import { useAppDispatch, useAppSelector } from "@/store/index";
import { getAllProduct } from "@/api/stock/index";
import DataTable from "@/components/table/DataTable";
import { columns } from "./table/columns";
import AddNewProduct from "./chunks/AddNewProductDialog";

const ProductView = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading, error } = getAllProduct.useQuery();
  const cartItems = useAppSelector((state) => state.cart.cartItems);

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto py-10 px-5 relative">
      <h4 className="text-lg font-semibold mb-4">Stock Page</h4>
      <div className="absolute top-10 right-10">
            <AddNewProduct/>
      </div>
      <DataTable columns={columns} data={data || []} />
    </div>
  );
};

export default ProductView;
