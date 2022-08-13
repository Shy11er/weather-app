let hrElement;

export const rainFun = () => {
    for (let i = 0; i < 100; i++) {
        hrElement = document.createElement("HR");
        hrElement.style.left = Math.floor(Math.random() * window.innerWidth) + "px";
        hrElement.style.animationDuration = 0.2 + Math.random() * 0.3 + "s";
        hrElement.style.animationDelay = Math.random() * 5 + "s";
        
        document.body.appendChild(hrElement);
  }
}