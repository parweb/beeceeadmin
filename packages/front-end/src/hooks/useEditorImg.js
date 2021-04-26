import { useEffect, useState, useRef } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';

import { urlImage, format } from 'helpers';
import { $document, $editorImg } from 'state';

const useImageSize = () => {
  const editorImg = useRecoilValue($editorImg);

  const [isLoading, setIsloading] = useState(false);
  const [size, setSize] = useState({ width: null, height: null });

  const imageRef = useRef(new Image());
  imageRef.current.setAttribute('crossOrigin', '');

  useEffect(() => {
    if (editorImg && imageRef?.current) {
      setSize({ width: null, height: null });
      setIsloading(true);

      const extension = format(editorImg);
      if (['pdf', 'eml', 'html'].includes(extension)) {
        const timeout = setTimeout(() => {
          setSize({
            width: 1000,
            height: 1000
          });

          setIsloading(false);
        }, 500);

        return () => clearTimeout(timeout);
      } else {
        imageRef.current.src = editorImg;
        imageRef.current.onload = () => {
          try {
            setSize({
              width: imageRef?.current?.width,
              height: imageRef?.current?.height
            });

            setIsloading(false);
          } catch (_) {}
        };
      }
    }
  }, [editorImg]);

  return { size, imageRef, isLoading };
};

const useEditorImg = () => {
  const document = useRecoilValue($document);
  const src = urlImage(document?.externalUrl);

  const { size, imageRef, isLoading } = useImageSize();

  const [editorImg, setEditorImg] = useRecoilState($editorImg);

  useEffect(() => {
    setEditorImg(src);
  }, [src, setEditorImg]);

  return [
    {
      currentImg: editorImg,
      isLoading,
      src,
      ...size,
      imageRef: size.width ? imageRef : null
    },
    setEditorImg
  ];
};

export default useEditorImg;
