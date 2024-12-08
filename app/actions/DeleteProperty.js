"use server";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import cloudinary from "@/config/cloudinary";

const deleteProperty = async (propertyId) => {
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("user ID is required");
  }

  const { userId } = sessionUser;

  const property = await Property.findById(propertyId);
  if (!property) {
    throw new Error("property not found");
  }
  // Verify ownership
  if (property.owner.toString() !== userId) {
    throw new Error("Unauthorized");
  }

  // Extract public ID from cloudinary image URL
  const publicIds = property.images.map((imageUrl) => {
    const parts = imageUrl.split("/");
    return parts.at(-1).split(".").at(0);
  });

  // Delete property images from Cloudinary
  if (publicIds.length > 0) {
    for (let publicId of publicIds) {
      await cloudinary.uploader.destroy("propertypulse/" + publicId);
    }
  }

  // Delete this property from Database
  await property.deleteOne();
  // Revalidate
  revalidatePath("/", "layout");
};

export default deleteProperty;
