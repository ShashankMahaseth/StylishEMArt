# Hide `google-services.json` from Git (step by step, no prior knowledge needed)

We do **not** use ProGuard for this. The right fix is to keep the file out of Git and make builds safe when the file is missing.

---

## 1) Tell Git to ignore the file
Edit `.gitignore` (project root) and add:
```
android/app/google-services.json
android/app/google-services.json.backup
```

If `.gitignore` already exists, just append those two lines.

---

## 2) Provide a template for teammates/CI
Create `android/app/google-services.json.example` with fake values so others know the shape:
```json
{
  "project_info": {
    "project_number": "000000000000",
    "project_id": "your-project-id"
  },
  "client": [
    {
      "client_info": {
        "mobilesdk_app_id": "1:000000000000:android:example",
        "android_client_info": {
          "package_name": "com.stylishemart"
        }
      },
      "api_key": [
        { "current_key": "FAKE_KEY_PUT_REAL_ONE_LOCALLY" }
      ]
    }
  ]
}
```
Teammates copy it to `android/app/google-services.json` and fill real keys locally; Git will ignore it.

---

## 3) Make Gradle resilient if the file is missing
Edit `android/app/build.gradle` near the top, **replacing** the direct apply with a guarded one:
```gradle
if (file("${rootProject.projectDir}/app/google-services.json").exists()) {
    apply plugin: "com.google.gms.google-services"
    println "google-services.json found: Firebase configured"
} else {
    println "google-services.json NOT found: skipping Firebase config (expected in CI or fresh clone)"
}
```

---

## 4) (Optional) Add a debug-only placeholder to avoid resource errors
Create `android/app/src/debug/res/values/google-services-placeholder.xml`:
```xml
<resources>
    <string name="default_web_client_id">debug-placeholder</string>
</resources>
```
This helps if any library expects that string in debug builds.

---

## 5) What **not** to do
- Don’t try to “hide” the JSON with ProGuard (it only obfuscates code, not assets).
- Don’t commit real Firebase keys to Git.

---

## Quick checklist
- `.gitignore` has the two lines.
- Template file exists with fake values.
- Guarded apply block in `android/app/build.gradle`.
- (Optional) debug placeholder XML present.
