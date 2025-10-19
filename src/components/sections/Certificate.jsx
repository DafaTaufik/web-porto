import React from "react";
import CardCertif from "../ui/CardCertif";
import { CertificateData } from "../../data/CertificateData";

export default function Certificate() {
  return (
    <section id="certificate" className="w-full h-full flex flex-col justify-center items-center overflow-hidden">
      <span className="font-HWT text-4xl items-center">Certificate</span>
      <div className="mt-5 w-full grid grid-cols-3 place-items-center px-9 gap-y-5">
        {CertificateData.map((certificate) => (
          <CardCertif key={certificate.id} certificate={certificate} />
        ))}
      </div>
    </section>
  );
}
