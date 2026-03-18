import { Fragment } from "react/jsx-runtime";
import Content from "./content";
import Nav from "./nav";

const Page = () => {
  return (
    <Fragment>
      <Nav />
      <Content />
    </Fragment>
  );
};

export default Page;
