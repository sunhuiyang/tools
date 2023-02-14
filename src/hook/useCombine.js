import Bus from "../api/bus";
export const useCombine = async function (name) {
  const res = await Bus.getData("combinations");
  let combines = res.filter((item) => item.name === name);
  return combines;
};
