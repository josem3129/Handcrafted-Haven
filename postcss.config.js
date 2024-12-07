module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
  images: {
    remotePattern: [
      {
        protocol: "https",
        hostname: "example.com",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
};
