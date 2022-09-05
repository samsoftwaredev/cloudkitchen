import styles from "./hero.module.scss";
import { ReactNode, useEffect, useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { useScroll } from "@/hooks";

interface Props {
  title: string;
  subTitle: string;
  bgImage: StaticImageData;
  isOverlay?: boolean;
  textColor?: string;
  component?: ReactNode;
  isBottomShadowEnabled?: boolean;
  isTopShadowEnabled?: boolean;
  executeAnimationOnPageLoad?: boolean;
}

const Hero = ({
  title,
  subTitle,
  bgImage,
  isOverlay = false,
  component = null,
  isBottomShadowEnabled = false,
  isTopShadowEnabled = false,
  executeAnimationOnPageLoad = false,
}: Props) => {
  const { height: windowHeight } = useScroll();
  const [animationClass, setAnimationClass] = useState("");
  const containerElement = useRef<HTMLInputElement>(null);

  const topShadow = isTopShadowEnabled ? styles.topShadow : "";
  const bottomShadow = isBottomShadowEnabled ? styles.bottomShadow : "";

  useEffect(() => {
    const elementTop = containerElement.current?.getBoundingClientRect().top;
    if (executeAnimationOnPageLoad) {
      setAnimationClass(styles.enter);
    } else {
      const elementVisible = 150;
      if (elementTop && elementTop < windowHeight - elementVisible) {
        setAnimationClass(styles.enter);
      } else {
        setAnimationClass("");
      }
    }
  });

  return (
    <div className={[styles.container, topShadow, bottomShadow].join(" ")}>
      <div className={styles.backgroundImage}>
        {isOverlay && <div className={styles.overlay} />}
        <Image
          className={styles.image}
          alt="Mountains"
          src={bgImage}
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
      <div
        ref={containerElement}
        className={[styles.backgroundText, styles.text, animationClass].join(
          " "
        )}
      >
        <h1>{title}</h1>
        <h2>{subTitle}</h2>
      </div>
      <div className={styles.componentContainer}>{component}</div>
    </div>
  );
};

export default Hero;
