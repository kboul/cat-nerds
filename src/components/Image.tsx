import { ImgHTMLAttributes, useCallback, useEffect, useState } from "react";

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  errorImg?: string;
  placeholderImg?: string;
}

export default function Image({
  errorImg,
  placeholderImg,
  src,
  ...otherProps
}: ImageProps) {
  const [imgSrc, setSrc] = useState(placeholderImg || src);

  const onLoad = useCallback(() => setSrc(src), [src]);

  const onError = useCallback(() => {
    setSrc(errorImg || placeholderImg);
  }, [errorImg, placeholderImg]);

  useEffect(() => {
    const img = new (window as any).Image();
    img.src = src as string;
    img.addEventListener("load", onLoad);
    img.addEventListener("error", onError);

    return () => {
      img.removeEventListener("load", onLoad);
      img.removeEventListener("error", onError);
    };
  }, [src, onLoad, onError]);

  return <img {...otherProps} alt={imgSrc} src={imgSrc} />;
}
