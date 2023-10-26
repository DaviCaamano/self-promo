import localFont from 'next/font/local';

export const montserratFont = localFont({
  src: [
    {
      path: './ttf/Montserrat-Thin.ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: './ttf/Montserrat-ThinItalic.ttf',
      weight: '100',
      style: 'italic',
    },
    {
      path: './ttf/Montserrat-ExtraLight.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: './ttf/Montserrat-ExtraLightItalic.ttf',
      weight: '200',
      style: 'italic',
    },

    {
      path: './ttf/Montserrat-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './ttf/Montserrat-LightItalic.ttf',
      weight: '300',
      style: 'italic',
    },

    {
      path: './ttf/Montserrat-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './ttf/Montserrat-Italic.ttf',
      weight: '400',
      style: 'italic',
    },

    {
      path: './ttf/Montserrat-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './ttf/Montserrat-MediumItalic.ttf',
      weight: '500',
      style: 'italic',
    },

    {
      path: './ttf/Montserrat-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './ttf/Montserrat-SemiBoldItalic.ttf',
      weight: '600',
      style: 'italic',
    },

    {
      path: './ttf/Montserrat-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './ttf/Montserrat-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },

    {
      path: './ttf/Montserrat-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: './ttf/Montserrat-ExtraBoldItalic.ttf',
      weight: '800',
      style: 'italic',
    },

    {
      path: './ttf/Montserrat-Black.ttf',
      weight: '900',
      style: 'normal',
    },
    {
      path: './ttf/Montserrat-BlackItalic.ttf',
      weight: '900',
      style: 'italic',
    },
  ],
  variable: '--font-montserrat',
});
