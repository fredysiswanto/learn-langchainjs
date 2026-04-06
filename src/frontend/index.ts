/**
 * Frontend logic untuk chatbot
 * Hanya berisi DOM manipulation dan API calls
 */

// API configuration - auto-detect host atau fallback ke default
const API_BASE_URL = (() => {
  // Jika dibuka dari window.__ENV__ (dari backend)
  if (typeof window !== "undefined" && (window as any).__ENV__?.API_URL) {
    return (window as any).__ENV__.API_URL;
  }

  // Jika dibuka dari HTTP, gunakan hostname yang sama dengan port 3000
  if (typeof window !== "undefined" && window.location.hostname) {
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    return `${protocol}//${hostname}:3000`;
  }

  // Last resort fallback
  return "http://localhost:3010";
})();

const CHAT_ENDPOINT = `${API_BASE_URL}/api/chat`;

console.log(`📡 API Base URL: ${API_BASE_URL}`);

document.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("✉️ Submit event triggered");
  progressConversation();
});

// Setup suggestion buttons
const suggestionButtons = document.querySelectorAll(".suggestion-btn");
suggestionButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const text = (btn as HTMLButtonElement).getAttribute("data-text");
    if (text) {
      const input = document.getElementById(
        "user-input",
      ) as HTMLTextAreaElement;
      input.value = text;
      input.focus();
    }
  });
});

/**
 * Handle conversation flow
 */
async function progressConversation() {
  const userInput = document.getElementById(
    "user-input",
  ) as HTMLTextAreaElement;
  const chatbotConversation = document.getElementById(
    "chatbot-conversation-container",
  ) as HTMLDivElement;
  const statusText = document.getElementById("status-text") as HTMLElement;
  const statusDot = document.getElementById("status-dot") as HTMLElement;

  const question = userInput.value.trim();

  if (!question) {
    console.warn("⚠️ Empty question");
    return;
  }

  userInput.value = "";
  userInput.disabled = true;

  // Add user message bubble
  const userBubble = document.createElement("div");
  userBubble.classList.add("speech", "speech-human");
  userBubble.textContent = question;
  chatbotConversation.appendChild(userBubble);
  chatbotConversation.scrollTop = chatbotConversation.scrollHeight;

  // Add loading indicator
  const loadingBubble = document.createElement("div");
  loadingBubble.classList.add("speech", "speech-ai");
  loadingBubble.innerHTML =
    '<div class="typing"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>';
  chatbotConversation.appendChild(loadingBubble);
  chatbotConversation.scrollTop = chatbotConversation.scrollHeight;

  // Update status
  statusText.textContent = "Sedang memproses...";
  statusDot.style.background = "#f59e0b";

  try {
    console.log("📡 Sending request to:", CHAT_ENDPOINT);

    const response = await fetch(CHAT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    // Remove loading indicator
    chatbotConversation.removeChild(loadingBubble);

    // Add AI response bubble
    const aiBubble = document.createElement("div");
    aiBubble.classList.add("speech", "speech-ai");
    aiBubble.textContent = data.answer || "❌ Tidak ada jawaban";
    chatbotConversation.appendChild(aiBubble);
    chatbotConversation.scrollTop = chatbotConversation.scrollHeight;

    statusText.textContent = "Siap digunakan";
    statusDot.style.background = "#22c55e";

    console.log("✅ Response received");
  } catch (error) {
    console.error("❌ Error:", error);

    // Remove loading indicator
    chatbotConversation.removeChild(loadingBubble);

    // Add error bubble
    const errorBubble = document.createElement("div");
    errorBubble.classList.add("speech", "speech-ai");
    errorBubble.style.borderColor = "#ef4444";
    errorBubble.style.color = "#fca5a5";
    errorBubble.textContent =
      error instanceof Error
        ? `❌ Error: ${error.message}`
        : "❌ Terjadi error saat berkomunikasi dengan server";
    chatbotConversation.appendChild(errorBubble);
    chatbotConversation.scrollTop = chatbotConversation.scrollHeight;

    statusText.textContent = "Koneksi error";
    statusDot.style.background = "#ef4444";
  } finally {
    userInput.disabled = false;
    userInput.focus();
  }
}
