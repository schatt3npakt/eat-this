<script setup lang="ts">
  import { watch } from "vue";
  import { useGameState } from "./composables/gameState";
  import { Flavors } from "./types";
  import { useHotkeys } from "./composables/useHotkeys";

  const {
    scoops,
    flavors,
    gameTimer,
    currentOrder,
    isGameOver,
    customers,
    happyCustomers,
    updateScoops,
    checkOrder,
  } = useGameState();

  const { arrowUp, arrowRight, arrowLeft, arrowDown, enter } = useHotkeys();

  watch(arrowUp, () => {
    if (arrowUp.value === true) updateScoops(Flavors.CHOCOLATE);
  });
  watch(arrowRight, () => {
    if (arrowRight.value === true) updateScoops(Flavors.STRAWBERRY);
  });
  watch(arrowLeft, () => {
    if (arrowLeft.value === true) updateScoops(Flavors.VANILLA);
  });
  watch(arrowDown, () => {
    if (arrowDown.value === true) updateScoops(Flavors.BLUEBERRY);
  });
  watch(enter, () => {
    if (enter.value === true) {
      if (isGameOver.value === false) {
        checkOrder();
      } else {
        handleReset();
      }
    }
  });

  function handleReset() {
    window.location.reload();
  }
</script>

<template>
  <div class="wrapper">
    <div class="game">
      <div class="game-over" v-show="isGameOver">
        <div>
          <h2>Hooray!</h2>

          <p>
            You served <b>{{ happyCustomers.length }}</b> lucky customer{{
              happyCustomers.length === 1 ? "" : "s"
            }}. <br />
            Try again?
          </p>
        </div>

        <button class="reset-button" @click="handleReset()">Yeah!</button>
      </div>

      <div class="upper-screen">
        <div class="timer">
          <span>{{ gameTimer }}</span>
          <img src="../assets/clock.png" alt="" />
        </div>

        <div class="dialog">
          <div
            v-for="(item, index) in currentOrder"
            :style="`background-position: -96px ${item * -32}px;`"
            :key="index"
          ></div>
        </div>

        <div class="happy-customers">
          <div
            v-for="(customer, index) in happyCustomers"
            :style="`background-position: -50px ${customer.sprite * -60}px`"
            :key="index"
          ></div>
        </div>

        <div class="customers">
          <div
            :style="`background-position: 0 ${customer.sprite * -60}px`"
            v-for="(customer, index) in customers"
            :key="index"
          ></div>
        </div>
      </div>

      <div class="bottom-screen">
        <div class="hand">
          <div class="scoops">
            <div
              v-for="(scoop, index) in scoops"
              :style="`background-position: ${
                scoop.durability * -32
              }px ${scoop.flavor * -32}px;`"
              :key="index"
            ></div>
          </div>
        </div>

        <div class="table"></div>

        <div class="ice-tray">
          <button
            :style="`background-position: 0 ${index * -45}px`"
            v-for="(flavor, index) in flavors"
            :key="index"
            @click="updateScoops(flavor)"
          ></button>
        </div>
      </div>

      <button v-if="scoops.length >= 1" class="eat-button" @click="checkOrder">
        Eat This!
      </button>
    </div>
  </div>
</template>

<style>
  @import url("https://fonts.googleapis.com/css2?family=VT323&display=swap");

  html {
    animation: background-scroll 10s infinite linear;
    background-image: url("../assets/wallpaper.png");
  }

  .wrapper {
    display: grid;
    justify-content: center;
    align-items: center;
    height: 100dvh;
    position: relative;

    & .game {
      background-image: url("../assets/bg.png");
      box-shadow: 0 0 20px 10px rgba(57, 56, 56, 0.1);
      width: 320px;
      height: 200px;
      position: relative;
      overflow: hidden;
      image-rendering: pixelated;
      transform: scale(1.2);

      & .game-over {
        backdrop-filter: blur(5px) grayscale(100%);
        font-family: "VT323";
        color: #4f546b;
        background-color: rgba(255, 255, 255, 0.5);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 4;
        text-align: center;

        & h2 {
          margin: 0;
        }

        & > div {
          display: flex;
          justify-content: center;
          flex-flow: column;
          align-items: center;
          background-color: #dff6f5;
          border: 1px solid #4f546b;
          position: relative;
          max-width: 200px;
          margin: 20px auto 10px auto;

          &::after {
            background-color: #8aebf0;
            height: 8px;
            width: 100%;
            position: absolute;
            bottom: 0;
            left: 0;
            content: "";
            display: block;
          }
        }
      }

      & .upper-screen {
        & .timer {
          color: #4f546b;
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 20px;
          position: absolute;
          top: 8px;
          right: 8px;
          font-family: "VT323";

          & img {
            margin-left: -3px;
          }
        }

        & .dialog {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.5rem;
          position: absolute;
          top: 10px;
          left: 80px;
          background-image: url("../assets/dialog.png");
          width: 170px;
          height: 40px;

          & div {
            background: url('../assets/flavors.png');
            width: 32px;
            height: 32px;
          }
        }

        & .happy-customers {
          position: absolute;
          top: 40px;
          left: 80px;

          & div {
            position: absolute;
            background-image: url("../assets/chars.png");
            top: 0;
            left: 0;
            flex-shrink: 0;
            width: 50px;
            height: 60px;

            &:nth-child(odd) {
              animation: rotate-jump-left 5s ease-out forwards;
            }

            &:nth-child(even) {
              animation: rotate-jump-right 5s ease-out forwards;
            }
          }
        }

        & .customers {
          position: absolute;
          display: flex;
          align-items: flex-end;
          gap: 8px;
          top: 40px;
          right: 0;
          height: 90px;
          width: 240px;

          & div {
            animation: customer-idle 1s steps(1, end) infinite;
            flex-shrink: 0;
            width: 50px;
            height: 60px;
            background-image: url("../assets/chars.png");

            &:nth-child(odd) {
              animation: customer-idle 1s steps(1, end) infinite reverse;
            }
          }
        }
      }

      & .bottom-screen {
        & .hand {
          animation: arm-idle 1s steps(1, end) infinite reverse;
          position: absolute;
          left: 16px;
          bottom: 0;
          width: 40px;
          height: 60px;
          background-image: url("../assets/arm.png");
          z-index: 3;

          & .scoops {
            position: absolute;
            bottom: 47px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            justify-content: center;
            flex-flow: column;

            & div {
              background: url('../assets/flavors.png');
              width: 32px;
              height: 32px;
              margin-top: -16px;

              &:nth-child(1) {
                z-index: 6;
              }

              &:nth-child(2) {
                z-index: 5;
              }

              &:nth-child(3) {
                z-index: 4;
              }

              &:nth-child(4) {
                z-index: 3;
              }

              &:nth-child(5) {
                z-index: 2;
              }

              &:nth-child(6) {
                z-index: 1;
              }
            }
          }
        }

        & .table {
          background-image: url("../assets/table.png");
          display: block;
          position: absolute;
          content: "";
          bottom: 0;
          left: 0;
          width: 100%;
          height: 80px;
        }

        & .ice-tray {
          position: absolute;
          bottom: 0;
          right: 0;
          display: grid;
          grid-template-columns: 1fr 1fr;

          & button {
            background: url('../assets/icecream.png');
            border-radius: 0;
            cursor: pointer;
            border: none;
            width: 45px;
            height: 45px;

            &:hover,
            &:focus {
              transform: scale(1.1);
            }
          }
        }
      }

      & .eat-button {
        color: #4f546b;
        font-family: "VT323";
        cursor: pointer;
        border: none;
        padding: 10px;
        background-image: url("../assets/button-bg.png");
        position: absolute;
        bottom: 16px;
        left: 50%;
        transform: translateX(-50%) scale(1);
        text-transform: uppercase;
        text-align: left;
        width: 102px;

        &:hover,
        &:focus {
          transform: translateX(-50%) scale(1.1);
          transform-origin: center center;
        }
      }
    }
  }

  .reset-button {
    color: #4f546b;
    font-family: "VT323";
    border: none;
    background-image: url("../assets/button-bg.png");
    text-align: left;
    cursor: pointer;
    height: 35px;
    width: 102px;

    &:hover,
    &:focus {
      transform: scale(1.1);
      transform-origin: center center;
    }
  }

  @media (min-width: 720px) {
    .wrapper {
      & .game {
        transform: scale(2);
      }
    }
  }

  @media (min-width: 1400px) {
    .wrapper {
      & .game {
        transform: scale(3);
      }
    }
  }

  @keyframes rotate-jump-left {
    from {
      transform: translate(0, 0) rotate(0deg);
    }

    to {
      transform: translate(-400px, -200px) rotate(10000deg);
    }
  }

  @keyframes rotate-jump-right {
    from {
      transform: translate(0, 0) rotate(0deg);
    }

    to {
      transform: translate(1000px, -200px) rotate(10000deg);
    }
  }

  @keyframes arm-idle {
    50% {
      transform: translateY(5px);
    }
  }

  @keyframes customer-idle {
    50% {
      transform: translateY(-5px);
    }
  }

  @keyframes background-scroll {
    from {
      background-position: 0 0;
    }
    to {
      background-position: 192px 192px;
    }
  }
</style>
