const passwordInput = document.getElementById('passwordInput');
const strengthMessage = document.getElementById('strengthMessage');
const breachMessage = document.getElementById('breachMessage');

passwordInput.addEventListener('input', async () => {
  const pwd = passwordInput.value;

  if (pwd.length === 0) {
    strengthMessage.textContent = "";
    breachMessage.textContent = "";
    return;
  }

  const strength = evaluateStrength(pwd);
  strengthMessage.textContent = `${strength.label}`;
  strengthMessage.style.color = strength.color;

  const hashed = await sha1(pwd);
  const prefix = hashed.slice(0, 5).toUpperCase();
  const suffix = hashed.slice(5).toUpperCase();
  const res = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
  const text = await res.text();

  if (text.includes(suffix)) {
    breachMessage.textContent = "❌ This password has appeared in known data breaches!";
    breachMessage.style.color = "red";
  } else {
    breachMessage.textContent = "✅ This password has not been found in public breaches.";
    breachMessage.style.color = "green";
  }
});

function evaluateStrength(pwd) {
  let score = 0;

  const hasLower = /[a-z]/.test(pwd);
  const hasUpper = /[A-Z]/.test(pwd);
  const hasDigit = /\d/.test(pwd);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);
  const uniqueChars = new Set(pwd).size;
  const length = pwd.length;

  if (length >= 8) score += 1;
  if (length >= 12) score += 1;
  if (hasLower) score += 1;
  if (hasUpper) score += 1;
  if (hasDigit) score += 1;
  if (hasSymbol) score += 1;
  if (uniqueChars >= 6) score += 1;

  const entropy = Math.log2(Math.pow(uniqueChars, length)).toFixed(2);

  if (score <= 2) {
    return { label: `❌ Very Weak (Entropy: ${entropy})`, color: "red" };
  } else if (score <= 4) {
    return { label: `⚠️ Weak (Entropy: ${entropy})`, color: "orange" };
  } else if (score <= 6) {
    return { label: `🟡 Moderate (Entropy: ${entropy})`, color: "goldenrod" };
  } else {
    return { label: `✅ Strong (Entropy: ${entropy})`, color: "green" };
  }
}

async function sha1(str) {
  const buffer = new TextEncoder().encode(str);
  const hash = await crypto.subtle.digest('SHA-1', buffer);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}
