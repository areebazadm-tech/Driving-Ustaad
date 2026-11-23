# Driving Ustaad — CYE Hackathon 2026

React Native / JavaScript / Expo mobile prototype.

**Track:** Education (EdTech)  
**Competition:** Capital Youth Expo 2026, Innovation Sprint  
**Online build window (per competition listing):** November 16–28, 2026  
**Source:** Original working prototype created for this hackathon; team should document all contributions and verify compliance with event rules.

## What is in this starter?

Nine screens inspired by the team's provided mobile UI references:

1. Welcome / Get Started — F-1
2. Create Account — SRS-1.1 (UI only)
3. Check Your Details — SRS-1.2 (client-side checks)
4. Verify Your Account — SRS-1.3 (simulated code)
5. Verification Required / expired code — SRS-1.3 (local expiry)
6. Log In — SRS-1.4 (frontend simulation)
7. Biometric Login — SRS-1.4 (device API demonstration)
8. Account Temporarily Locked — SRS-1.5 (in-memory counter)
9. My Profile — F-2 (in-memory form editing)

Also includes the **Home / Learn / Explore / Progress / Profile** navigation bar. Non-profile tabs are honest placeholders; build them next.

**Warning:** Authentication is not production-ready. User information, password comparisons, registration status, and lockout counters currently live only in JavaScript memory and reset when the app reloads. OTP `482416` is a hardcoded demonstration value, not emailed or sent by SMS. Passwords are not stored on a server, hashing is not implemented, and Google/Apple/Facebook login are not connected. The biometric prompt is device-local and does not prove the user has a real server session. Do not use the demo to protect real user data, and do not present it as live authentication to judges.

## Tech stack and external library disclosure

| Tool / library | Purpose |
|---|---|
| React Native | Mobile UI/components |
| React | Component/state layer |
| Expo SDK 58 | Development and device preview |
| `@expo/vector-icons` | Ionicons and MaterialCommunityIcons |
| `expo-font`, `@expo-google-fonts/inter` | Inter font family |
| `react-native-safe-area-context` | Notch and system-bar insets |
| `expo-status-bar` | Status bar presentation |
| `expo-local-authentication` | Device biometric prompt |

**No third-party API, paid service, database, map service, or LLM is connected in this starter.** Keep this section current as new libraries/APIs are added. UI assets (`assets/driving-ustaad-logo.png` and `assets/welcome-road.png`) were cropped from images supplied by the project team. Confirm team rights before publication. The initial code was assisted by ChatGPT; review it, test it and disclose AI-assisted development if the competition requires it.

## Installation (Windows PowerShell, VS Code)

1. Install Node.js LTS, VS Code, Git, and Expo Go on your phone.
2. Extract the ZIP file into a folder. Open a terminal in the folder containing `package.json`.
3. Run:

```powershell
npm install
npx expo install --check
npx expo start
```

4. On the phone, scan the QR code in Expo Go. Phone and laptop should normally use the same network. If necessary, run `npx expo start --tunnel`.

The dependency versions correspond to the Expo SDK 58 release. If Expo reports version alignment problems, run `npx expo install --fix` and commit the resulting `package-lock.json`. Do not copy over an existing application's `package.json` without understanding the dependencies.

**Alternative if you already created an Expo blank app:** copy `App.js`, `src/` and `assets/` from this starter to your app; install missing libraries with:

```powershell
npx expo install @expo/vector-icons expo-font expo-status-bar expo-local-authentication react-native-safe-area-context
npm install @expo-google-fonts/inter
npx expo start
```

## Demo walkthrough for judges

**Registration:** Welcome → Get Started → Fill sample details (or enter your own) → Create Account → validation → Continue → enter `482416` → Verify Account → My Profile. Code expiry is simulated after 2 minutes; resend replaces the timer. "Preview expired-code screen" demonstrates the failed state.

**Login:** Sign out → Log In with:

- Email: `demo@drivingustaad.app`
- Password: `Demo123!`

**Lockout:** Five wrong demo login attempts lead to the lock screen; the simulated lock lasts 15 minutes. For a demo reset, reload the app. This lockout is NOT enforced by a backend, so do not describe it as an actual security boundary.

**Biometrics:** Choose login with biometrics, then use actual device fingerprint/face unlocking if installed. The **iOS Face ID prompt does not work in Expo Go**; it needs a custom development build. A physical Android device with enrolled biometrics is easiest for testing.

**Profile:** Tap the four rows, edit data, tap Save changes. The edited details remain available while the app is running, but are not stored on a server or across restarts.

## File structure

```text
DrivingUstaadStarter/
├─ App.js                 # screen routing + prototype state/actions
├─ index.js               # entry point
├─ app.json               # Expo app configuration
├─ package.json           # dependencies
├─ .gitignore             # files excluded from Git
├─ assets/
│  ├─ driving-ustaad-logo.png
│  └─ welcome-road.png
└─ src/
   ├─ theme.js           # navy/orange tokens and validators
   ├─ ui.js              # shared inputs, buttons, navigation, layout
   ├─ AuthScreens.js     # 8 registration/login screens
   └─ AppScreens.js      # profile + other tab placeholders
```

## Publish this to GitHub

Create a **public, empty repository** named `DrivingUstaad` in the GitHub website, without adding a README or .gitignore there. Then run these commands in the project folder:

```powershell
git init
git branch -M main
git add .
git commit -m "feat: add Driving Ustaad Expo auth and profile UI starter"
git remote add origin https://github.com/YOUR-USERNAME/DrivingUstaad.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your real GitHub username. If `git init` says already initialized, that's okay. If the folder already has a Git remote, run `git remote -v` before trying to add `origin` again. On a shared team, do not overwrite the existing remote or its history. GitHub sign-in may be requested by the credential manager; use its supported authentication flow rather than your GitHub account password directly.

For *every meaningful change*, use:

```powershell
git status
git add .
git commit -m "feat: implement verification error states"
git push
```

A **commit** records a change locally; **push** makes it visible on GitHub. **Do not commit secrets, API keys, service-account files, or `.env` credentials**. `node_modules` stays excluded by `.gitignore`. Include the `package-lock.json` generated by `npm install`.

For teams, prefer feature branches:

```powershell
git switch -c feature/profile
# edit, test...
git add .
git commit -m "feat: add profile preferences editing"
git push -u origin feature/profile
```

Then open a pull request on GitHub and merge after review. To update your local main branch afterwards:

```powershell
git switch main
git pull origin main
```

## Daily commit roadmap (November 23–28)

| Date | Target | Example commit message |
|---|---|---|
| Nov 23 | Create Expo app; welcome, signup, validation, navigation; publish repo | `feat: initial auth UI and navigation` |
| Nov 24 | OTP expiry/resend, login states, biometric & lockout demo | `feat: implement authentication states` |
| Nov 25 | Profile, learner preferences, inputs, responsive polish | `feat: build editable learner profile` |
| Nov 26 | Add an actual EdTech value demo: a driving lesson, road signs or a quiz | `feat: add interactive road-sign quiz` |
| Nov 27 | Bug fixing, real-device testing, architecture disclosure, screenshots | `test: verify mobile flows and update README` |
| Nov 28 | Complete 2-minute demo video, slide deck and final submission | `docs: finalize hackathon submission` |

Do not make empty, artificial commits. Several small meaningful commits per day are fine; one tested change per day is better than committing unstable code. Make the main EdTech learning feature functional before prioritizing decorative screens.

## Submission checklist (from supplied event listing)

- [ ] Public GitHub repository containing full source code and README
- [ ] README lists every external library and API used
- [ ] Functional prototype tested on physical mobile device
- [ ] Working deployment/demo link if the project is web/cloud-based; for a mobile-only prototype, confirm accepted demo format with organizers
- [ ] Recorded walkthrough, at most 2 minutes
- [ ] Presentation deck as PDF or PPTX
- [ ] Submit before November 28, 2026, 11:59 PM (confirm timezone with organizer)

## Planned real backend integration

Before treating registration/login as real: use a real auth provider or backend with password hashing, server-side validation and rate limits, verified OTP email/SMS delivery with expiration, safe token handling, authorized profile endpoints and secure recovery flows. Move sensitive operations away from the client and never place privileged keys in the React Native bundle.
