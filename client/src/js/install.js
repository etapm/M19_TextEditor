const butInstall = document.getElementById("buttonInstall");

// Logic for installing the PWA
let deferredPrompt;

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredPrompt = event;
  butInstall.style.display = "block";
});

butInstall.addEventListener("click", async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const userChoice = await deferredPrompt.userChoice;
    console.log(`User response: ${userChoice.outcome}`);
    deferredPrompt = null;
    butInstall.style.display = "none";
  }
});

window.addEventListener("appinstalled", (event) => {
  console.log("PWA installed successfully");
});
