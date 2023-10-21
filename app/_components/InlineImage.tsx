import Image, { ImageProps } from "next/image";

export const InlineImage = ({ src, alt }: ImageProps) => (
  <Image src={src} alt={alt} width={30} height={30} className='inline pr-2 m-0 align-text-top'/>
)
