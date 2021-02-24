/* @jsx jsx */
import {
  FC,
  MutableRefObject,
  useRef,
  useMemo,
  useState,
  useEffect,
  Fragment,
  ImgHTMLAttributes
} from 'react';
import PropTypes from 'prop-types';
import { cx } from '@emotion/css';
import { jsx, useTheme } from '@emotion/react';
import { THEME_BREAKPOINTS_KEYS, ThemeSettingsBreakpoint } from '@arwes/design';
import { WithAnimatorInputProps } from '@arwes/animation';
import { WithBleepsInputProps } from '@arwes/sounds';

import { loadImage } from '../utils/loadImage';
import { TextProps, Text } from '../Text';
import { LoadingBarsProps, LoadingBars } from '../LoadingBars';
import { generateStyles } from './Figure.styles';

type FigurePropsSrcListItem = string | undefined | null;

interface FigureProps {
  src: string | FigurePropsSrcListItem[]
  alt?: string
  fluid?: boolean
  preload?: boolean
  imgProps?: ImgHTMLAttributes<HTMLImageElement>
  descriptionTextProps?: TextProps
  loadingProps?: LoadingBarsProps
  rootRef?: MutableRefObject<HTMLDivElement> | ((node: HTMLDivElement) => void)
  className?: string
}

const Figure: FC<FigureProps & WithAnimatorInputProps & WithBleepsInputProps> = props => {
  const {
    animator,
    bleeps,
    src,
    alt,
    fluid,
    preload,
    imgProps,
    descriptionTextProps,
    loadingProps,
    className,
    children,
    rootRef
  } = props;
  const { animate } = animator;

  const theme = useTheme();
  const styles = useMemo(
    () => generateStyles(theme, { animate, fluid }),
    [theme, animate, fluid]
  );

  const containerRef = useRef<HTMLDivElement | null>(null);
  const isMountedRef = useRef(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (preload) {
      // TODO: Handle responsive images.
      const imageURL: string = Array.isArray(src) ? 'TODO' : src;

      setIsLoading(true);

      loadImage(imageURL)
        // TODO: Handle error.
        .catch(() => {})
        .then(() => {
          if (isMountedRef.current) {
            setIsLoading(false);
          }
        })
        .catch(() => {});
    }

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  animator.setupAnimateRefs(containerRef, theme, styles, bleeps);

  return (
    <figure
      className={cx('arwes-figure', className)}
      css={styles.root}
      ref={rootRef}
    >
      <div
        className='arwes-figure__container'
        css={styles.container}
        ref={containerRef}
      >
        <div
          className='arwes-figure__content'
          css={styles.content}
        >
          <picture
            className='arwes-figure__asset'
            css={styles.asset}
          >
            {!Array.isArray(src) && (
              <img
                {...imgProps}
                className='arwes-figure__image'
                css={styles.image}
                src={src}
                alt={alt}
              />
            )}
            {Array.isArray(src) && (
              src
                .map((srcItem: string | undefined | null, index: number) => {
                  if (!srcItem) {
                    return null;
                  }

                  if (index === 0) {
                    return (
                      <img
                        key={index}
                        {...imgProps}
                        className='arwes-figure__image'
                        css={styles.image}
                        src={srcItem}
                        alt={alt}
                      />
                    );
                  }

                  return (
                    <source
                      key={index}
                      srcSet={srcItem}
                      media={theme.breakpoints
                        .up(THEME_BREAKPOINTS_KEYS[index] as ThemeSettingsBreakpoint)
                        .replace('@media ', '')}
                    />
                  );
                })
                .filter(Boolean)
                .reverse()
            )}
            {preload && isLoading && (
              <LoadingBars
                {...loadingProps}
                className='arwes-figure__loading'
                css={styles.loading}
                full
              />
            )}
          </picture>
          {!!children && (
            <div
              className='arwes-figure__description'
              css={styles.description}
            >
              <div
                className='arwes-figure__description-bg arwes-figure__description-bg1'
                css={[styles.descriptionBg, styles.descriptionBg1]}
              />
              <div
                className='arwes-figure__description-bg arwes-figure__description-bg2'
                css={[styles.descriptionBg, styles.descriptionBg2]}
              />
              <div
                className='arwes-figure__description-bg arwes-figure__description-bg3'
                css={[styles.descriptionBg, styles.descriptionBg3]}
              />
              <figcaption
                className='arwes-figure__description-text'
                css={styles.descriptionText}
              >
                <Text {...descriptionTextProps}>
                  {children}
                </Text>
              </figcaption>
            </div>
          )}
        </div>

        <div
          className='arwes-figure__line arwes-figure__line-a arwes-figure__line-a1'
          css={[styles.line, styles.lineA1]}
        />
        <div
          className='arwes-figure__line arwes-figure__line-a arwes-figure__line-a2'
          css={[styles.line, styles.lineA2]}
        />

        <div
          className='arwes-figure__line arwes-figure__line-b arwes-figure__line-b1'
          css={[styles.line, styles.lineB1]}
        />
        <div
          className='arwes-figure__line arwes-figure__line-b arwes-figure__line-b1'
          css={[styles.line, styles.lineB2]}
        />

        {!!children && (
          <Fragment>
            <div
              className='arwes-figure__line arwes-figure__line-c'
              css={[styles.line, styles.lineC]}
            />
            <div
              className='arwes-figure__line arwes-figure__line-d'
              css={[styles.line, styles.lineD]}
            />
          </Fragment>
        )}
      </div>
    </figure>
  );
};

Figure.propTypes = {
  src: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.arrayOf(PropTypes.string)
  ]).isRequired,
  alt: PropTypes.string,
  fluid: PropTypes.bool,
  imgProps: PropTypes.object,
  descriptionTextProps: PropTypes.object,
  loadingProps: PropTypes.object,
  className: PropTypes.string,
  rootRef: PropTypes.any
};

Figure.defaultProps = {
  descriptionTextProps: {
    blink: false
  }
};

export { FigureProps, Figure };