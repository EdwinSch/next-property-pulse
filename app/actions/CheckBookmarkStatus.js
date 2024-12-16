"use server";
import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

const CheckBookmarkStatus = async (propertyId) => {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("user ID is required");
  }
  const { userId } = sessionUser;
  const user = await User.findById(userId);

  // Find existing bookmarks for this user
  let isBookmarked = user.bookmarks.includes(propertyId);

  return { isBookmarked };
};

export default CheckBookmarkStatus;
