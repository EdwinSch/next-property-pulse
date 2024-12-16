"use server";
import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

const BookmarkProperty = async (propertyId) => {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("user ID is required");
  }
  const { userId } = sessionUser;
  const user = await User.findById(userId);

  // Find existing bookmarks for this user
  let isBookmarked = user.bookmarks.includes(propertyId);
  let message;
  // Add or remove property to bookmarks based on current bookmarks
  if (isBookmarked) {
    // Remove
    user.bookmarks.pull(propertyId);
    message = "Bookmark removed";
    isBookmarked = false;
  } else {
    // Add
    user.bookmarks.push(propertyId);
    message = "Bookmark added";
    isBookmarked = true;
  }

  // Update/save user to DB
  await user.save();
  // Revalidate path
  revalidatePath("/properties/saved", "page");

  // Returns
  return {
    message,
    isBookmarked,
  };
};

export default BookmarkProperty;
