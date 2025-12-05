import React from "react";
import { Metadata } from "next";
import PortfolioDetailsShowcaseMain from "@/pages/portfolio/details/portfolio-showcase-details-main";

export const metadata: Metadata = {
  title: "Liko - Portfolio Details Showcase page",
};

export default function PortfolioDetailsShowcasePage({
  params,
}: {
  params: { slug: string };
}) {
  return <PortfolioDetailsShowcaseMain params={params} />;
}
