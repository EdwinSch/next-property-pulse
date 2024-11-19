const SinglePropertyPage = ({ params, searchParams }) => {
  console.log("hello from server");

  return <div>Dynamic PropertyPage: {params.id}</div>;
};
export default SinglePropertyPage;

// searchParams.name
