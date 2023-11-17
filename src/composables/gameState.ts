import { computed, ref } from "vue";
import { Flavors, Durability } from "../types";
import type { Ref } from "vue";
import type { Customer, Scoop } from "../types";

export function useGameState() {
  const maxScoops = 4;
  const initialCustomers = 10;
  const customers: Ref<Array<Customer>> = ref([]);
  const happyCustomers: Ref<Array<Customer>> = ref([]);
  const scoops: Ref<Array<Scoop>> = ref([]);
  const flavors: Ref<Array<Flavors>> = ref([]);
  let gameTimer: Ref<number> = ref(20);
  let isGameOver = computed(() => {
    return gameTimer.value === 0;
  });
  let isMaxScoopsReached = computed(() => {
    return scoops.value.length === maxScoops;
  });
  const currentOrder: Ref<Array<Flavors>> = ref([]);

  function setupCustomers() {
    for (let i = 0; i <= initialCustomers; i++) {
      constructCustomerAndPushToCustomers();
    }
  }

  function setupFlavors() {
    flavors.value.push(
      Flavors.CHOCOLATE,
      Flavors.STRAWBERRY,
      Flavors.VANILLA,
      Flavors.BLUEBERRY
    );
  }

  function setupOrder() {
    currentOrder.value = customers.value[0].order;
  }

  function updateScoops(flavor: Flavors) {
    if (isMaxScoopsReached.value === true || isGameOver.value === true) return;

    scoops.value.push({
      flavor: flavor,
      durability: Durability.FULL,
    });
  }

  function isOrderCorrect() {
    const currentServing = scoops.value.map((scoop) => scoop.flavor);

    return currentOrder.value.join("") === currentServing.join("");
  }

  function checkOrder() {
    if (isOrderCorrect() === true) {
      happyCustomers.value.push(customers.value.splice(0, 1)[0]);
      currentOrder.value = customers.value[0].order;
      constructCustomerAndPushToCustomers();
    }

    scoops.value = [];
  }

  function decreaseGameTimer() {
    if (gameTimer.value !== 0) gameTimer.value--;
  }

  function getRandomFlavor() {
    const numberOfFlavours = Object.values(Flavors).length;

    return Object.values(Flavors)[
      getRandomNumber(numberOfFlavours / 2, numberOfFlavours)
    ];
  }

  // decrease scoop durability
  function decreaseScoopDurability() {
    scoops.value.map((scoop) => {
      if (scoop.durability === 0) return false;

      return (scoop.durability = scoop.durability - 2);
    });

    scoops.value = scoops.value.filter((scoop) => scoop.durability > 0);
  }

  function constructCustomerAndPushToCustomers() {
    const constructedOrder = constructOrder();

    customers.value.push({
      sprite: getRandomNumber(0, 3),
      order: constructedOrder,
    });
  }

  function constructOrder() {
    const constructedOrder: Array<Flavors> = [];

    for (let i = 0; i <= getRandomNumber(1, maxScoops); i++) {
      constructedOrder.push(getRandomFlavor() as Flavors);
    }

    return constructedOrder;
  }

  function tick() {
    if (isGameOver.value === true) return;

    decreaseGameTimer();
    decreaseScoopDurability();

    window.setTimeout(tick, 1000);
  }

  setupFlavors();
  setupCustomers();
  setupOrder();
  tick();

  return {
    scoops,
    flavors,
    gameTimer,
    isGameOver,
    currentOrder,
    customers,
    happyCustomers,
    updateScoops,
    checkOrder,
  };
}

function getRandomNumber(min: number, max: number): number {
  // Calculate a random number between min (inclusive) and max (exclusive)
  return Math.floor(Math.random() * (max - min) + min);
}
