export type BannerInfo = {
  title: string;
  description: string;
  button: string;
  infoNumbers: InfoNumbers[];
};

export type InfoNumbers = {
  number: string;
  description: string;
};

export const BANNERINFO = {
  title: "FIND <u>ANYTHING</u> THAT MATCHES YOUR STYLE",
  description:
    "Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.",
  button: "Shop Now",
  infoNumbers: [
    {
      number: "200+",
      description: "International Brands",
    },
    {
      number: "2,000+",
      description: "High-Quality Products",
    },
    {
      number: "30,000+",
      description: "Happy Customers",
    },
  ],
};
