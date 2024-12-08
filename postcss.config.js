module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
  images: {
    remotePattern: [
      {
        protocol: "https",
        hostname: "lego.com",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
};
