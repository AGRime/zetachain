import { isNetworkName } from "@zetachain/addresses";
import { saveAddress } from "@zetachain/addresses-tools";
import { network } from "hardhat";

import { getMultiChainSwapUniV3 } from "../../lib/multi-chain-swap/MultiChainSwap.helpers";
import { getAddress } from "../../lib/shared/address.helpers";
import { GetContractParams } from "../../lib/shared/deploy.helpers";
import { MultiChainSwapUniV3__factory } from "../../typechain-types";

export async function deployMultiChainSwap() {
  if (!isNetworkName(network.name) || !network.name) throw new Error("Invalid network name");

  const CONNECTOR = getAddress("connector");

  const ZETA_TOKEN = getAddress("zetaToken");

  const UNI_FACTORY_V3 = getAddress("uniswapV3PoolFactory");

  const UNI_ROUTER_V3 = getAddress("uniswapV3Router");

  const WETH = getAddress("weth9");

  const deployParams: GetContractParams<MultiChainSwapUniV3__factory> = {
    deployParams: [CONNECTOR, ZETA_TOKEN, UNI_ROUTER_V3, UNI_FACTORY_V3, WETH, 500, 3000]
  };

  console.log(deployParams);

  const multiChainSwapContract = await getMultiChainSwapUniV3(deployParams);

  saveAddress("multiChainSwap", multiChainSwapContract.address);
}

if (!process.env.EXECUTE_PROGRAMMATICALLY) {
  deployMultiChainSwap().catch(error => {
    console.error(error);
    process.exit(1);
  });
}
