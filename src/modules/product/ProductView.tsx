import { useAppDispatch, useAppSelector } from "@/store/index";
import { getAllProduct } from "@/api/stock/index";
import DataTable from "@/components/table/DataTable"; // Use your DataTable component
import { columns } from "./table/columns"; // Assuming columns are defined separately
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

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
        <Link to="/cart">
          <Button className="bg-[#012a4a] text-[#cae9ff] p-2 rounded-full">
            <FontAwesomeIcon icon={faCartShopping} size="lg" />
            {cartCount > 0 && (
              <span className="ml-2 text-sm bg-red-500 text-white rounded-full px-2 py-1">
                {cartCount}
              </span>
            )}
          </Button>
        </Link>
      </div>

      {/* DataTable to display the products */}
      <DataTable columns={columns} data={data || []} />
    </div>
  );
};

export default ProductView;
