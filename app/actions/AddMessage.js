"use server";
import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

const AddMessage = async (previousState, formData) => {
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

  const recipient = formData.get("recipient");

  // --- Prevent user messages itself
  //   if (userId === recipient) {
  //     return { error: "You can not send a message to yourself" };
  //   }

  const newMessage = new Message({
    sender: userId,
    recipient,
    property: formData.get("property"),
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    body: formData.get("body"),
  });

  await newMessage.save();

  return { submitted: true };
};

export default AddMessage;
