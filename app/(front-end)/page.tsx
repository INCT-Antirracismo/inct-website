export type IndexProps = {};

export default async function Index(props: IndexProps) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-sun text-brown">
      <div className="grid md:flex gap-12">
        <img src="./icon.png" alt="" className=" w-32 h-fit" />
        <div className="text-left">
          <p className="text-xl md:text-2xl lg:text-3xl">Vem ai o</p>
          <h1 className="text-5xl md:text-5xl lg:text-7xl font-black mt-2 mb-6 text-black">
            INCT Antirracismo
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-balance">
            Uma{' '}
            <span className="font-bold underline decoration-white decoration-1 decoration-dotted underline-offset-4">
              educação transformadora
            </span>
            <br />
            em movimento pela <span className="font-bold">América Latina</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
