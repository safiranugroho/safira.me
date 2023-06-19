<div class="container">
  <div class="ball" />
</div>

<style>
  .container {
    position: fixed;
    top: 0;
    left: 0;

    width: 100vw;
    height: 100vh;

    pointer-events: none;
  }

  .ball {
    width: 50px;
    height: 50px;

    background: red;
    border-radius: 50%;

    cursor: move;

    animation: bounce-all-over 15s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }

  @keyframes bounce-all-over {
    0% {
      transform: translate3d(0, 100vh, 0);
    }
    10% {
      transform: translate3d(5vw, 0, 0);
    }
    20% {
      transform: translate3d(15vw, 100vh, 0);
    }
    30% {
      transform: translate3d(65vw, 0, 0);
    }
    40% {
      transform: translate3d(100vw, 50vh, 0);
    }
    50% {
      transform: translate3d(75vw, 100vh, 0);
    }
    60% {
      transform: translate3d(25vw, 0, 0);
    }
    70% {
      transform: translate3d(0, 75vh, 0);
    }
    80% {
      transform: translate3d(10vw, 100vh, 0);
    }
    90% {
      transform: translate3d(35vw, 0, 0);
    }
    100% {
      transform: translate3d(0, 100vh, 0);
    }
  }
</style>
