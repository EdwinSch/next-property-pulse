"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import deleteProperty from "@/app/actions/DeleteProperty";
import { toast } from "react-toastify";

const ProfileProperties = ({ properties }) => {
  const [propertiesList, setPropertiesList] = useState(properties);
  //   console.log(propertiesList);

  const handleDeleteProperty = async (propertyId) => {
    const confirm = window.confirm(
      "Are you sure you want tot delete this property?"
    );
    // Check for user deletion confirmtion
    if (!confirm) return;
    // IF confirmed call delete function for this property
    await deleteProperty(propertyId);
    // Update the properties list state
    const updatedProperties = properties.filter(
      (property) => property._id !== propertyId
    );
    setPropertiesList(updatedProperties);
    // Show Toast conformation
    toast.success("Property deleted", { autoClose: 3000 });
  };

  return propertiesList.map((property) => {
    const { _id, name, location, images } = property;

    return (
      <div className="mb-10" key={_id}>
        <Link href={`/properties/${_id}`}>
          <Image
            className="h-32 w-full rounded-md object-cover"
            src={images[0]}
            alt={name}
            width={1000}
            height={200}
          />
        </Link>
        <div className="mt-2">
          <p className="text-lg font-semibold">{name}</p>
          <p className="text-gray-600">
            address: {location.street}, {location.city} {location.state}
          </p>
        </div>
        <div className="mt-2">
          <Link
            href={`/properties/${_id}/edit`}
            className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
          >
            Edit
          </Link>
          <button
            className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
            type="button"
            onClick={() => handleDeleteProperty(_id)}
          >
            Delete
          </button>
        </div>
      </div>
    );
  });
};
export default ProfileProperties;
