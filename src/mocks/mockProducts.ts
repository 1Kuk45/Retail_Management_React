// mocks/mockProduct.ts
const mockGetAllProduct = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            productId: "1",
            productName: "Laptop",
            stockQty: 15,
            sellingPrice: 1200,
          },
          {
            productId: "2",
            productName: "Smartphone",
            stockQty: 30,
            sellingPrice: 800,
          },
          {
            productId: "3",
            productName: "Headphones",
            stockQty: 50,
            sellingPrice: 150,
          },
          {
            productId: "1",
            productName: "Laptop",
            stockQty: 15,
            sellingPrice: 1200,
          },
          {
            productId: "2",
            productName: "Smartphone",
            stockQty: 30,
            sellingPrice: 800,
          },
          {
            productId: "3",
            productName: "Headphones",
            stockQty: 50,
            sellingPrice: 150,
          },
          {
            productId: "1",
            productName: "Laptop",
            stockQty: 15,
            sellingPrice: 1200,
          },
          {
            productId: "2",
            productName: "Smartphone",
            stockQty: 30,
            sellingPrice: 800,
          },
          {
            productId: "3",
            productName: "Headphones",
            stockQty: 50,
            sellingPrice: 150,
          },
          {
            productId: "1",
            productName: "Laptop",
            stockQty: 15,
            sellingPrice: 1200,
          },
          {
            productId: "2",
            productName: "Smartphone",
            stockQty: 30,
            sellingPrice: 800,
          },
          {
            productId: "3",
            productName: "Headphones",
            stockQty: 50,
            sellingPrice: 150,
          },
        ]);
      }, 1000); // Simulate a 1-second delay
    });
  };
  
  export default mockGetAllProduct;
  