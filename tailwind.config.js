module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    container: {
      center: true,
    },
    colors: {
      'light-blue' : '#EBF2FF',
      'blue': '#3860AD',
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'orange': '#ffa84a',
      'red' : '#EE6363',
      'green-light': '#13ce66',
      'green' : '#46B13D',
      'green-dark': '#1C7714',
      'yellow': '#ffc82c',
      'gray-dark': '#666666',
      'gray': '#999999',
      'gray-light': '#F4F4F4',
      'white' : '#fff',
      'light-black' : '#222',
      'black' : '#000'
    },
    fontSize: {
      xs : ['10px', '15px'],
      '2xs' : ['12px', '18px'],
      sm: ['14px', '21px'],
      base: ['15px', '22px'],
      lg: ['16px', '24px'],
      xl: ['18px', '26px'],
      'xl-plus' : ['20px', '30px'],
      '2xl': ['22px', '33px'],
      '3xl': ['30px', '45px']
    },
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
    extend: {
      width: {
        '100px': '100px',
      }
    }
  },
  plugins: [],
}
