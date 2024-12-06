"use server";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import cloudinary from "@/config/cloudinary";

const AddProperty = async (formData) => {
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

  // Access all values from amenities and images
  const amenities = formData.getAll("amenities");
  const images = formData.getAll("images").filter((image) => image.name !== "");
  // .map((image) => image.name);

  // Access all remaining form data
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
    amenities,
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
  //   console.log(propertyData);

  // Create image URL's to Cloudinary
  const imageUrls = [];

  for (const imageFile of images) {
    const imageBuffer = await imageFile.arrayBuffer();
    const imageArray = Array.from(new Uint8Array(imageBuffer));
    const imageData = Buffer.from(imageArray);

    // Convert image array to base64
    const imageBase64 = imageData.toString("base64");

    // Make request tot cloudinary and upload
    const result = await cloudinary.uploader.upload(
      `data:image/png;base64,${imageBase64}`,
      { folder: "propertypulse" }
    );

    // push results to urls array
    imageUrls.push(result.secure_url);
  }

  propertyData.images = imageUrls;

  // Save new property to DB
  const newProperty = new Property(propertyData);
  await newProperty.save();

  // Revalidate cache
  revalidatePath("/", "layout");

  // Redirect to new property listing
  redirect(`/properties/${newProperty._id}`);
};

export default AddProperty;
