import Image from "next/image";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import profileDefault from "@/assets/images/profile.png";
import ProfileProperties from "@/components/ProfileProperties";
import { convertToSerializableObject } from "@/utils/convertToObject";

const ProfilePage = async () => {
  // get User
  await connectDB();
  const sessionUser = await getSessionUser();
  const { userId } = sessionUser;

  if (!userId) {
    throw new Error("user ID is required");
  }

  // Find User listings
  const propertiesDocs = await Property.find({ owner: userId }).lean();
  // Serialize properties data
  const properties = propertiesDocs.map(convertToSerializableObject);

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 ml-0 md:ml-6 mr-20 mt-10 mb-12 md:mb-0">
              <div className="mb-4">
                <Image
                  className="h-20 w-20 rounded-full md:mx-0"
                  src={sessionUser.user.image || profileDefault}
                  alt="User"
                  width={200}
                  height={200}
                />
              </div>

              <h2 className="text-lg mb-4">
                <span className="font-bold block">Name: </span>{" "}
                {sessionUser.user.name}
              </h2>
              <h2 className="text-lg">
                <span className="font-bold block">Email: </span>{" "}
                {sessionUser.user.email}
              </h2>
            </div>

            <div className="md:w-3/4 md:pl-4">
              <h2 className="text-xl font-semibold mb-4">Your Listings</h2>

              <ProfileProperties properties={properties} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ProfilePage;
