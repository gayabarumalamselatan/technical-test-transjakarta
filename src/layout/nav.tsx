export const Logo = () => {
  return <img src="/assets/img/TJ-Putih.png" alt="logo" className="h-15" />;
};

export default function Nav() {
  return (
    <div className="bg-primary flex  items-center p-5">
      <div className="w-full xl:ml-20 xl:justify-start md:justify-start justify-center flex gap-5 items-center">
        <Logo />
        <div className="h-10 w-px bg-white/20 hidden sm:block"></div>

        <div className="text-white flex flex-col justify-center">
          <span
            className="text-sm font-md
           tracking-widest leading-none mb-0"
          >
            Sistem Manajemen
          </span>
          <h1 className="font-bold text-2xl">Armada Transjakarta</h1>
        </div>
      </div>
    </div>
  );
}
