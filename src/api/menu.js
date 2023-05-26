

export const getRoutes = () => {
  return new Promise((resolve) => {
    resolve({
      route,
      name: "shy",
      permissions: ["user"],
    });
  });
};
