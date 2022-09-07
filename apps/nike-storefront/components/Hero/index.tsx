import Image from "next/image";

export const Hero = () => {
  return (
    <div className="px-16 my-10">
      <Image src="/hero.jpg" layout="responsive" width={1152} height={600} alt="" />
    </div>
  );
};
