import React from "react";
import { Helmet } from "react-helmet-async";

const Meta = ({ title, description, keyword }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keyword} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "ProShop",
  description:
    "Shop Smart, Shop Easy, Shop Cheap, Shop ProShop - Your Ultimate Online Destination!",
  keyword:
    "Phones, Accessories, electronics, buy electronics, cheap electronics, Smart Home, Shop Smart",
};

export default Meta;
