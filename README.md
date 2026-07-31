# Jeff Electric Home Power Lab

A playable, mobile-first virtual Houston home that helps homeowners understand how everyday equipment, weather and decades of changing electrical life connect together.

## Experience

- Photorealistic cutaway home with eight interactive equipment systems
- Houston scenario presets: 100°F afternoon, family dinner, laundry day, thunderstorm, hurricane preparation and new-EV night
- 1975, 1995, 2015 and Today time-machine views
- Simplified electrical X-ray with animated power pathways
- Non-blocking “Something changed” cues that let the homeowner choose when to inspect an event
- Progressive control tabs that reveal Houston moments, equipment and the time machine one at a time
- Plain-language active-system count rather than a safety-like numeric score
- “Wait—did you see that?” observation moments with homeowner-safe next steps
- Personalized Home Power Story summarizing equipment and recognized situations
- Keyboard-accessible controls, native safety dialog and reduced-motion support

Activity points, pathways and events are explicitly illustrative. Home Power Lab is not an NEC load calculation, service-sizing tool, inspection, diagnosis or safety determination.

## Run locally

No build step, API key or paid dependency is required.

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`.

## Deploy

The GitHub Actions workflow publishes the static site on every push to `main`.

1. Open **Settings → Pages**.
2. Set **Source** to **GitHub Actions**.
3. Run **Deploy static site to Pages** if it does not start automatically.

Live URL: `https://closetcabby-del.github.io/Jeff-Electric-PowerScope/`

## Safety

The experience never directs visitors to remove covers, touch exposed conductors, test live wiring, disassemble electrical equipment or perform energized work.

Active smoke, fire, arcing, shock near water, downed lines or immediate danger requires leaving the area and calling 911. The experience does not replace emergency services, the electric utility, appliance service or a licensed electrician.
