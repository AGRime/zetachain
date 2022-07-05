import { BigNumber } from "ethers";

type CustomErrorParamType = BigNumber | number | string;
export const getCustomErrorMessage = (errorMethod: string, params?: [CustomErrorParamType]) => {
  const stringParams = params
    ? params
        .map((p: CustomErrorParamType) => {
          if (typeof p === "number") {
            return p;
          }

          return `"${p.toString()}"`;
        })
        .join(", ")
    : "";
  return `VM Exception while processing transaction: reverted with custom error '${errorMethod}(${stringParams})'`;
};
