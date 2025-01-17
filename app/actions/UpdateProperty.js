"use server";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const updateProperty = async (propertyId, formData) => {
  // Connect to DB
  await connectDB();
  // Get session
  const sessionUser = await getSessionUser();
  // If NO user present
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }

  // Destructure from sessionUser
  const { userId } = sessionUser;

  // Verify ownership
  const existingProperty = await Property.findById(propertyId);
  if (existingProperty.owner.toString() !== userId) {
    throw new Error("current user does not own this property");
  }

  // Property object
  const propertyData = {
    owner: userId,
    type: formData.get("type"),
    name: formData.get("name"),
    description: formData.get("description"),
    location: {
      street: formData.get("location.street"),
      city: formData.get("location.city"),
      state: formData.get("location.state"),
      zipcode: formData.get("location.zipcode"),
    },
    beds: formData.get("beds"),
    baths: formData.get("baths"),
    square_feet: formData.get("square_feet"),
    amenities: formData.getAll("amenities"),
    rates: {
      nightly: formData.get("rates.nightly"),
      weekly: formData.get("rates.weekly"),
      monthly: formData.get("rates.monthly"),
    },
    seller_info: {
      name: formData.get("seller_info.name"),
      email: formData.get("seller_info.email"),
      phone: formData.get("seller_info.phone"),
    },
  };

  // Update property on server
  const updatedProperty = await Property.findByIdAndUpdate(
    propertyId,
    propertyData
  );
  // Revalidate
  revalidatePath("/", "layout");
  // Redirect
  redirect(`/properties/${updatedProperty._id}`);
};

export default updateProperty;
