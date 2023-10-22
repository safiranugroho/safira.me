import Image, { ImageProps } from "next/image";

export const InlineImage = ({ src, alt }: ImageProps) => (
  <Image src={src} alt={alt} width={28} height={28} className='inline pr-2 m-0 align-text-top'/>
)
