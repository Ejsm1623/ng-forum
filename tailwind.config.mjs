/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
	  extend: {
		colors: {
		  //Configuración de Paleta de Colores
		  primary: "#141414",
		  secondary: "#2C2C2C",
		  tertiary: "#474747",
		  accent: "#EB5E28",
		  text: "#FFFCF2",
		  complementary: "#EBEBEB",
  
		  // Paleta de Colores de Aldeas
		  konoha: "#567E28",
		  kiri: "#4D60C3",
		  kumo: "#52498F",
		  suna: "#CAA72C",
		  iwa: "#A11E1A",
		},
	  },
	},
	plugins: [],
  };
  