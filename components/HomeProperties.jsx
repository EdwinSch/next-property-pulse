import PropertyCard from "./PropertyCard";
import Link from "next/link";

import connectDB from "@/config/database";
import Property from "@/models/Property";

const HomeProperties = async () => {
  await connectDB();
  const recentProperties = await Property.find({})
    .sort({ createdAt: -1 })
    .limit(3)
    .lean();

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <h2 className="text-3xl font-bold text-blue-500 mb-10 text-center capitalize">
          recently added properties
        </h2>
        {recentProperties.length === 0 ? (
          <p>no properties found...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentProperties.map((property) => {
              return <PropertyCard key={property._id} property={property} />;
            })}
          </div>
        )}
      </div>
      <Link
        href={"/properties"}
        className="max-w-lg m-auto my-6 block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700 capitalize"
      >
        view all properties
      </Link>
    </section>
  );
};
export default HomeProperties;
