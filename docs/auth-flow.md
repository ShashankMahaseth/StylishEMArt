# Authentication Flow with Redux & Firebase (Beginner Friendly)

This guide explains every piece of the auth stack in this project. You can follow it even if Redux or AsyncStorage are new to you.

---

## What Happens End to End
1) User opens the app → **Splash** checks if the user is already logged in.  
2) If logged in → **Home**. If not → **Onboarding → GetStarted → Auth**.  
3) On **Auth** screen, user taps Login/SignUp → we run Firebase auth, save login flags, and move to the correct screen (first-time → GetStarted, otherwise → Home).  
4) Logout clears flags and returns to Auth.

---

## Core Concepts in Plain Language
- **Redux store**: a single JS object that keeps app state (e.g., `auth.isLoggedIn`, `auth.status`, `auth.error`).  
- **Slice**: a focused part of the store with its own state + reducers. Ours is `auth`.  
- **Thunk**: an async action (function) that can dispatch other actions. We use thunks to call Firebase and update state.  
- **AsyncStorage**: simple key-value storage on the device; we keep login flags here so the app remembers state between launches.

---

## Important Files (clickable paths)
- Store setup: `src/presentation/store/store.ts`
- Typed hooks: `src/presentation/store/redux/hooks.ts`
- Thunks (async calls): `src/presentation/store/redux/authThunk.ts`
- Auth slice (state machine): `src/presentation/store/redux/authSlice.ts`
- Firebase datasource: `src/data/datasource/firebaseAuthDataSource.ts`
- Local storage helper: `src/core/storage/AsyncStorage.ts`
- Repository: `src/data/repositories/authRepositoryImpl.ts`
- Use cases: `src/domain/usecases/LoginUseCase.ts`, `signupUseCase.ts`, `checkAuthStatusUseCase.ts`
- Screens: `src/presentation/screens/Splash.tsx`, `AuthScreen.tsx`, `GetStarted.tsx`, `HomeScreen.tsx`
- Navigation stack: `src/presentation/navigation/AppNavigator.tsx`

---

## State Shape (auth slice)
```ts
{
  status: "idle" | "loading" | "authenticated" | "unauthenticated" | "error",
  isLoggedIn: boolean,
  error: string | null
}
```

---

## Async Flags We Persist
- `IS_LOGGED_IN` (AsyncStorage): true after login/signup; cleared on logout.
- `HAS_LOGGED_IN_BEFORE` (AsyncStorage): true after the first successful login/signup; used to decide GetStarted vs Home.

---

## How the Thunks Work
- `loginThunk({ email, password })`
  - Calls `LoginUseCase` → `AuthRepositoryImpl.login` → Firebase `signInWithEmailAndPassword`.
  - On success: sets `isLoggedIn=true` in Redux; you should also mark `IS_LOGGED_IN` and `HAS_LOGGED_IN_BEFORE` in UI flow.
- `signupThunk({ email, password })`
  - Same pattern but uses Firebase `createUserWithEmailAndPassword`.
- `logoutThunk()`
  - Calls Firebase `signOut` and clears local flag.
- `checkAuthThunk()`
  - Uses `AuthRepositoryImpl.isLoggedIn` (current Firebase user) to decide if session exists at app start.

> Thunks return Promises; use `.unwrap()` in components to get plain results or throw if rejected.

---

## Reducer Logic (authSlice)
- `pending`: `status="loading"`, `error=null`.
- `fulfilled` for login/signup/check: sets `isLoggedIn` from payload; sets `status` to `authenticated` or `unauthenticated`.
- `rejected`: `status="error"`, `error` gets message.
- `logout.fulfilled`: `isLoggedIn=false`, `status="unauthenticated"`.
- `clearAuthError`: helper to hide error messages.

---

## Screen Flow with Navigation
### Splash (`Splash.tsx`)
- On mount: dispatch `checkAuthThunk()`.
- If true → `navigation.replace("Home")`; else → `navigation.replace("Onboarding")`.

### Auth Screen (`AuthScreen.tsx`)
- Local form state for email/password.
- On submit:
  ```ts
  const ok = isSignUp
    ? await dispatch(signupThunk({ email, password })).unwrap()
    : await dispatch(loginThunk({ email, password })).unwrap();
  if (!ok) return;
  const firstTime = !(await getHasLoggedInBefore());
  await setHasLoggedInBefore(true);
  if (firstTime) navigation.replace("GetStarted");
  else navigation.replace("Home");
  ```
- Shows `error` from Redux; disables button when `status==="loading"`.

### GetStarted (`GetStarted.tsx`)
- After intro button, go to `navigation.replace("Home")` (not back to Auth).

### Home
- Your landing screen for authenticated users.

### Logout Example
```ts
await dispatch(logoutThunk()).unwrap();
await clearLoginStatus();
await setHasLoggedInBefore(true); // keep first-time as true after first login
navigation.replace("Auth");
```

---

## Why We Use Use Cases and Repository
- Use cases keep UI thin; they wrap the repository.
- Repository centralizes Firebase + local storage handling, so switching backend later is easier.

---

## Error Handling Pattern
- Thunks use `rejectWithValue` to pass readable messages.
- Components read `error` from `state.auth.error` and render a `Text` in red.
- Always wrap `unwrap()` in try/catch if you need custom UI reactions.

---

## First-Time vs Returning Users
- `HAS_LOGGED_IN_BEFORE` is checked after auth success:
  - `false` → send to GetStarted, then set it to `true`.
  - `true` → send directly to Home.

---

## Quick Reference (Copy/Paste Ready)
- Dispatch login:
  ```ts
  const ok = await dispatch(loginThunk({ email, password })).unwrap();
  ```
- Check auth on startup:
  ```ts
  const logged = await dispatch(checkAuthThunk()).unwrap();
  navigation.replace(logged ? "Home" : "Onboarding");
  ```
- Show error:
  ```ts
  const { error } = useAppSelector(s => s.auth);
  {error ? <Text style={{ color: "#F83758" }}>{error}</Text> : null}
  ```

---

## Common Pitfalls (and fixes)
- Button does nothing: forgot to pass `onPress` to `AuthButton`.
- Stuck on Auth after success: missing navigation replace to Home/GetStarted after thunk success.
- Firebase errors not shown: not rendering `state.auth.error`.
- App always shows Onboarding: `checkAuthThunk` not dispatched in Splash, or AsyncStorage flags never set.
- Build issues on Windows: avoid `armeabi-v7a`; keep `reactNativeArchitectures=arm64-v8a,x86_64`; set `org.gradle.workers.max=1`.

---

## How to Export This to PDF
1. Ensure you have a Markdown-to-PDF tool (e.g., `npm i -g markdown-pdf`).
2. From repo root:
   ```bash
   npx markdown-pdf docs/auth-flow.md -o docs/auth-flow.pdf
   ```
   Or print via your editor’s “Print to PDF”.

---

## If You Forget Everything Else
1) Dispatch thunks for async work.  
2) Slice state tells UI what to show.  
3) AsyncStorage keeps login flags across app restarts.  
4) Navigation decisions depend on `isLoggedIn` and `HAS_LOGGED_IN_BEFORE`.  
5) Handle errors from `state.auth.error` and block UI when `status="loading"`.
