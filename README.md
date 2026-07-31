# Jeff Electric HomeScope

A polished, mobile-first virtual electrical walkthrough for homeowners.

## What it includes

- Eight-room virtual home with interactive electrical objects and appliances
- Safe homeowner observations only—no tools, disassembly or energized testing
- One-question-at-a-time guidance for routine, appliance, utility, electrician, load-planning and emergency outcomes
- Persistent homeowner awareness list with reset support
- Keyboard-accessible controls, dialogs, large mobile tap targets and reduced-motion support

HomeScope never claims to inspect, diagnose or determine the safety or capacity of a property.

## Run locally

No build step or API key is required.

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`.

## Deploy on GitHub Pages

The included workflow publishes the static site automatically on every push to `main`. In the repository:

1. Open **Settings → Pages**.
2. Under **Build and deployment**, choose **GitHub Actions** as the source.
3. Run the `Deploy static site to Pages` workflow if it does not start automatically.

The expected URL is `https://closetcabby-del.github.io/Jeff-Electric-PowerScope/`.

## Safety and methodology

Guidance is intentionally limited to visible, homeowner-safe observations. The experience never instructs a visitor to remove a panel or outlet cover, touch exposed wiring, test live equipment or perform electrical work.

Active smoke, fire, arcing, shock near water, downed lines or immediate danger routes the visitor to leave the area and call 911. The educational guide does not replace emergency services, a utility, appliance service or a licensed electrician.
