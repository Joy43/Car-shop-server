import Car from "./cars.model";



// Function to update stock dynamically whenever quantity is changed
export const updatecarStock = async (carId: string) => {
  const car = await Car.findById(carId);
  if (!car) return;

  const isInStock = (car.quantity ?? 0) > 0; // Ensure quantity check is safe

  if (car.inStock !== isInStock) {
    await car.updateOne({ _id: carId }, { stock: isInStock });
  }
};