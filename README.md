# Jeff Electric Home Signals

A cinematic, mobile-first virtual-home experience that helps homeowners recognize everyday electrical signals without tools, disassembly or live testing.

## Experience

- Immersive entry into a furnished, photorealistic cutaway home
- “What brought you here?” entry choices using familiar homeowner language
- Optional construction-era, homeowner/renter and Southeast Houston area context
- Six guided moments: lighting changes, kitchen receptacles, breaker trips, EV charging, pool equipment and utility-side power loss
- Environmental lighting, warmth, charging-flow and grid effects
- One-question-at-a-time homeowner-safe guidance
- Personalized Home Signals report grouped into monitoring, landlord/electrician, load-planning, utility and emergency next steps
- Keyboard-accessible controls, native dialog behavior, visible focus states and reduced-motion support

Home Signals is educational. It does not inspect, diagnose or determine the safety or service capacity of a property.

## Run locally

No build step, API key or paid dependency is required.

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`.

## Deploy

The included GitHub Actions workflow publishes this static site on every push to `main`.

1. Open **Settings → Pages**.
2. Set **Source** to **GitHub Actions**.
3. Run **Deploy static site to Pages** if it does not start automatically.

Live URL: `https://closetcabby-del.github.io/Jeff-Electric-PowerScope/`

## Safety

The experience never directs a visitor to remove covers, touch exposed conductors, test live wiring, disassemble electrical equipment or perform energized work.

Active smoke, fire, arcing, shock near water, downed lines or immediate danger routes the visitor to leave the area and call 911. The guide does not replace emergency services, the electric utility, appliance service or a licensed electrician.
