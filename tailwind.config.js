/** @type {import('tailwindcss').Config} */
import fluid, { extract } from 'fluid-tailwind'

export default {
  content: {
    files:[
      "./index.html",
     "./src/**/*.{js,jsx,ts,tsx}"
    ], 
    extract
  },
  // [
  //   "./index.html",
  //   "./src/**/*.{js,jsx,ts,tsx}",
    
  // ],
  theme: {
    extend: {
      fontFamily:{
        italianno:['Italianno','cursive'],
      },
      colors:{
        'custom-gray':'#D9D9D9',
        customGradientStart:'#FFFFFF',
        customGradientEnd:'#000000'
      },
      borderRadius:{
        'custom-radius':'99px'
      }
    },
    screens : {
      '3xl':{'max':'1919px'},
      '2xl': {'max': '1535px'},
      // => @media (max-width: 1535px) { ... }

      'xl': {'max': '1279px'},
      // => @media (max-width: 1279px) { ... }

      'lg': {'max': '1023px'},
      // => @media (max-width: 1023px) { ... }

      'md': {'max': '767px'},
      // => @media (max-width: 767px) { ... }

      'sm': {'max': '639px'},

      'mdm': {'min':'767px'},

      'msc':{'min':'1079px'},

      'slg':{'min':'1023px'},
      // => @media (max-width: 639px) { ... }
      'p5':'1919px',
      'p3': '1280px',
      'p4': '1590px',
      'xl': '1280px',
      'tall':{'raw':'(max-height:1058px)'},
      '2xlt':{'raw':'(min-height:1428px)'},
      'sh':{'raw':'(max-height:952px)'},
      'xsh':{'raw':'(max-height:865px)'},
      '2xsh':{'raw':'(max-height:761px)'},
      '3xsh':{'raw':'(max-height:634px)'}
    }
  },
  plugins: [
    fluid,
    require('tailwind-scrollbar'),
  ]
}

