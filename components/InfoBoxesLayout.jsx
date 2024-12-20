import { FaBackspace } from "react-icons/fa";
import InfoBox from "./InfoBox";

const InfoBoxesLayout = () => {
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <InfoBox
            heading={"for renters"}
            bgColor="bg-blue-100"
            buttonInfo={{
              text: "browse properties",
              link: "/properties",
              bgColor: "bg-black",
            }}
          >
            Find your dream rental property. Bookmark properties and contact
            owners.
          </InfoBox>
          <InfoBox
            heading={"for property owners"}
            buttonInfo={{
              text: "add property",
              link: "/properties/add",
              bgColor: "bg-blue-500",
            }}
          >
            List your properties and reach potential tenants. Rent as an airbnb
            or long term.
          </InfoBox>
        </div>
      </div>
    </section>
  );
};
export default InfoBoxesLayout;
