# CrackStop

This is a lightweight web-based tool that analyzes password strength in real time and checks if the entered password has appeared in known data breaches — all securely in your browser.

## Features
- Live password strength evaluation with complexity scoring and entropy estimation
- Breach detection using [Have I Been Pwned](https://haveibeenpwned.com/API/v3) API with SHA-1 + k-anonymity (no password sent)
- Color-coded feedback with strength labels (Very Weak to Strong)
- Fully client-side — no backend or data collection

## Built With
- HTML, CSS, JavaScript
- HIBP Pwned Passwords API

## How to Run
1. Clone this repo or download the ZIP
2. Open `index.html` in your browser  
   (or use Live Server / Python HTTP server for local hosting)

## Future Improvements
- Password generator (XKCD-style / secure random)
- Dark mode toggle
- Clipboard copy and history tracker

## License
MIT License — free to use, modify, and share.
