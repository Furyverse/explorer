import { useBlockchain } from "@/stores";
import { createRouter, createWebHistory } from "vue-router";
// @ts-ignore
import { setupLayouts } from "virtual:generated-layouts";
// @ts-ignore
import routes from "~pages";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/highbury" // Redirect the default page to '/evmos'
    },
    ...setupLayouts(routes)
  ],
});

// Update current blockchain
router.beforeEach((to, from, next) => {
  const { chain } = to.params;
  if (chain && chain !== "highbury") {
    // If the requested chain is not 'fanfury', redirect to the 'fanfury' page
    next("/highbury");
  } else {
    const blockchain = useBlockchain();
    if (chain && chain !== blockchain.chainName) {
      blockchain.setCurrent(chain.toString());
    }
    next();
  }
});

export default router;
