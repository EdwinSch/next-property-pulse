"use client";
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  FacebookIcon,
  WhatsappIcon,
  XIcon,
} from "react-share";

const ShareButtons = ({ property }) => {
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;

  return (
    <>
      <h3 className="text-lg font-bold text-center pt-2 capitalize">
        share this property
      </h3>

      <div className="flex gap-3 justify-center pb-5">
        <WhatsappShareButton
          url={shareUrl}
          title={property.name}
          separator="::"
        >
          <WhatsappIcon size={40} round={true} />
        </WhatsappShareButton>

        <TwitterShareButton
          url={shareUrl}
          title={property.name}
          hashtags={[`${property.type.replace(/\s/g, "")}ForRent`]}
        >
          <XIcon size={40} round={true} />
        </TwitterShareButton>

        <FacebookShareButton
          url={shareUrl}
          quote={property.name}
          hashtag={`#${property.type.replace(/\s/g, "")}ForRent`}
        >
          <FacebookIcon size={40} round={true} />
        </FacebookShareButton>
      </div>
    </>
  );
};
export default ShareButtons;
