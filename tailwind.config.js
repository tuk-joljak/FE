// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/**/*.html"],
  theme: {
    extend: {
      colors: {
        primary: "#003366", // 네이비 블루
        secondary: "#007BFF", // 스카이 블루
        accent: "#F4F4F4", // 차분한 회색
        background: "#FFFFFF", // 화이트
        foreground: "#707070", // 다크 그레이
        border: "#E0E0E0", // 따뜻한 그레이
      },
      fontFamily: {
        sans: ["Open Sans", "sans-serif"], // 본문용 산세리프
        serif: ["Roboto Slab", "serif"], // 헤딩용 세리프
      },
      fontSize: {
        xs: "0.75rem", // 12px
        sm: "0.875rem", // 14px
        base: "1rem", // 16px
        lg: "1.125rem", // 18px
        xl: "1.25rem", // 20px
        "2xl": "1.5rem", // 24px
        "3xl": "1.875rem", // 30px
        "4xl": "2.25rem", // 36px
        "5xl": "3rem", // 48px
      },
    },
  },
};
