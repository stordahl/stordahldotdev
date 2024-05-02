(function main() {
  decorateMailToLinks()
})();

function decorateMailToLinks() {
  const links = [...document.querySelectorAll('[href^="mailto:"]')]
  for (const link of links) {
    link.addEventListener("click", (event) => {
      event.preventDefault()
      writeClipboardText("jacob@stordahl.dev") 
    })
  }
}

async function writeClipboardText(text) {
  if (!navigator?.clipboard) {
    console.warn("clipboard not supported")
    return
  }
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    console.error(error.message);
  }
}
