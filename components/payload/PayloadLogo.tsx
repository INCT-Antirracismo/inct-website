'use client';

export type PayloadLogoProps = {};

export default function PayloadLogo(props: PayloadLogoProps) {
  return (
    <div className="flex flex-col items-center gap-6 text-center justify-center">
      <img
        src="/icon.png"
        className="size-24 mx"
        alt="Logo INCT Antirracismo"
      />
      <p className="tracking-wide text-xs">
        Instituto Nacional de Ciência e Tecnologia Educação Transformadora:
        Antirracismo, Interseccionalidade e Justiça Social na América Latina
      </p>
    </div>
  );
}
