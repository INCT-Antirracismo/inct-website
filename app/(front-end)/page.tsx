export type IndexProps = {};

export default async function Index(props: IndexProps) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-sun text-brown">
      <div className="text-right">
        <p className="text-xl md:text-2xl lg:text-3xl">Vem ai o</p>
        <h1 className="text-5xl md:text-5xl lg:text-7xl font-black mt-2 mb-6 text-black">
          INCT Antirracismo
        </h1>
        <p className="text-xl md:text-2xl lg:text-3xl text-balance">
          Uma{' '}
          <span className="font-bold">
            educação
            <br /> transformadora
          </span>
          <br />
          em movimento pela
          <br />
          <span className="font-bold">América Latina</span>.
        </p>
      </div>
    </div>
  );
}
