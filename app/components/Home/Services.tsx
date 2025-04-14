import React, { Fragment } from "react";
import Card from "../Card/Card";
import { OUR_SERVICES } from "@/app/constants";

export default function Services() {
  return (
    <div className="flex md:flex-row flex-col justify-center items-center gap-4">
      {OUR_SERVICES.map((d) => {
        return (
          <Fragment key={d.id}>
            <Card name={d.name} description={d.description} image={d.image} />
          </Fragment>
        );
      })}
    </div>
  );
}
