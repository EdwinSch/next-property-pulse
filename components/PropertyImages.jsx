import Image from "next/image";

const PropertyImages = ({ property }) => {
  return (
    <section className="bg-blue-50 p-4">
      <div className="container mx-auto">
        {property.images.length === 1 ? (
          <Image
            src={property.images[0]}
            alt={property.name}
            className="object-cover h-[400px] mx-auto rounded-xl"
            width={1800}
            height={400}
            priority={true}
          />
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {property.images.map((image, index) => (
              <div
                key={index}
                className={`${
                  property.images.length === 3 && index === 2
                    ? "col-span-2"
                    : "col-span-1"
                }`}
              >
                <Image
                  src={image}
                  alt={property.name}
                  className="object-cover h-[400px] w-full rounded-xl"
                  width={1800}
                  height={400}
                  priority={true}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertyImages;
