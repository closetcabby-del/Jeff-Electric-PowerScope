# Jeff Electric Power Run

A polished, mobile-first homeowner arcade game themed for Jeff Electric.

## Gameplay

- Drive the Jeff Electric service van through Southeast Houston
- Jump electrical “bad idea” obstacles with Space, Arrow Up, tap or a large mobile control
- Collect electric-gold bolts and track distance
- Unlock six educational Signal Cards
- Visit Pasadena, Clear Lake, Pearland, Friendswood and Webster
- Pause/resume support, persistent best distance and reduced-motion adjustments

Hazards teach recognition, not repair. The game never directs a homeowner to remove covers, touch exposed conductors, test live wiring, disassemble equipment or perform energized work.

## Run locally

No build step, API key or paid dependency is required.

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`.

## Deploy

The included GitHub Actions workflow publishes the static site on every push to `main`.

Live URL: `https://closetcabby-del.github.io/Jeff-Electric-PowerScope/`

## Safety

The obstacles are game metaphors. Active smoke, fire, arcing or immediate danger requires leaving the area and calling 911. Stay away from downed lines and wet electrical equipment. Power Run does not inspect, diagnose or replace emergency services, the utility, a landlord or a licensed electrician.
