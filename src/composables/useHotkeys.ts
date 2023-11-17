import { ref, onMounted, onUnmounted } from "vue";

export function useHotkeys() {
  const arrowUp = ref(false);
  const arrowDown = ref(false);
  const arrowLeft = ref(false);
  const arrowRight = ref(false);
  const enter = ref(false);

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") event.preventDefault();

    switch (event.key) {
      case "ArrowUp":
        arrowUp.value = true;
        break;
      case "ArrowDown":
        arrowDown.value = true;
        break;
      case "ArrowLeft":
        arrowLeft.value = true;
        break;
      case "ArrowRight":
        arrowRight.value = true;
        break;
      case "Enter":
        enter.value = true;
        break;
    }
  }

  function handleKeyUp(event: KeyboardEvent) {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") event.preventDefault();

    switch (event.key) {
      case "ArrowUp":
        arrowUp.value = false;
        break;
      case "ArrowDown":
        arrowDown.value = false;
        break;
      case "ArrowLeft":
        arrowLeft.value = false;
        break;
      case "ArrowRight":
        arrowRight.value = false;
        break;
      case "Enter":
        enter.value = false;
        break;
    }
  }

  onMounted(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
  });

  onUnmounted(() => {
    window.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("keyup", handleKeyUp);
  });

  return {
    arrowUp,
    arrowDown,
    arrowLeft,
    arrowRight,
    enter
  };
}
