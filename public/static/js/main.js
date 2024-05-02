(function main() {
  decorateMailToLinks()
})();

function decorateMailToLinks() {
  const links = [...document.querySelectorAll('[href^="mailto:"]')]
  for (const link of links) {
    link.addEventListener("click", async (event) => {
      event.preventDefault()
      const success = await writeClipboardText("jacob@stordahl.dev") 
      if (success) {
        link.classList.add("copied")
        setTimeout(() => (link.classList.remove("copied")), 3000)
      } else {
        console.warn("clipboard not supported")
        link.classList.add("copied-error")
        setTimeout(() => (link.classList.remove("copied-error")), 3000)
      }
    })
  }
}

async function writeClipboardText(text) {
  if (!navigator?.clipboard) return false
  try {
    await navigator.clipboard.writeText(text);
    return true
  } catch (error) {
    console.error(error.message);
    return false
  }
}
