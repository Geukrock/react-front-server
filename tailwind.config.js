/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'main-color': '#222529',          // 흰색 (만약 CSS 변수랑 다르면 여기서 커스텀)
        // 필요한 컬러 더 추가 가능
      },
    },
  },
  plugins: [],
}
