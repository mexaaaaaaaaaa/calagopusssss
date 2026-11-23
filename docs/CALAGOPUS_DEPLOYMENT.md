# Petalnodes Theme (`io.calagopus.blush`) — Calagopus Deployment Guide

This guide documents how to build, validate, install, activate, and roll back the **Petalnodes Theme** (`io.calagopus.blush`) extension package (`Petalnodes-Theme.zip.c7s`) on a Calagopus Panel VPS (`panel_version >= 1.1.0`).

---

## 1. Verified Package Structure (`Petalnodes-Theme.zip.c7s`)

`Petalnodes-Theme.zip.c7s` is a reproducible Deflate ZIP extension archive structured for Calagopus Panel's extension importer (`shared/src/extensions/distr.rs`):

- `Metadata.toml` — top-level keys (`package_name = "io.calagopus.blush"`, `name = "Petalnodes Theme"`, `panel_version = ">=1.1.0"`)
- `backend/` and `backend/src/` (explicit ZIP directory entries)
  - `backend/Cargo.toml` — crate `io_calagopus_blush` using workspace dependencies (`shared`, `async-trait`, `tracing`)
  - `backend/src/lib.rs` — defines `pub struct ExtensionStruct` implementing `shared::extensions::Extension`
- `frontend/` and `frontend/src/` (explicit ZIP directory entries)
  - `frontend/package.json` — `"name": "io.calagopus.blush"`, `"main": "src/index.tsx"`, `"types": "src/index.tsx"`, `"dependencies": { "shared": "workspace:*" }`
  - `frontend/src/index.tsx` — default-exports `CalagopusBlushExtension` subclassing `Extension` from `'shared'`, configuring `blushThemeConfig`, `blushCssVariablesResolver`, light scheme lock, and global `AmbientPetalBackground`
  - All React pages, UI primitives, `DoodleCrewFooter`, 3D `PetalIslandScene`, reduced-motion SVG `IslandStaticFallback`, styles (`app.css`), and `boot.html`

Local development helpers (`frontend/src/shared-adapter.ts`, `frontend/tsconfig.json`, `*.test.ts`, `node_modules/`, `.env*`, `dist/`) are intentionally excluded from the archive so the host Calagopus Panel compiles cleanly against its native `shared` workspace package.

> **Filename Compatibility Note:** Calagopus's CLI exporter (`panel-rs extensions export`) commonly names archives `io_calagopus_blush.c7s.zip`, whereas this release artifact uses the requested name `Petalnodes-Theme.zip.c7s`. Both use the identical internal ZIP layout. If a panel Admin UI upload dialog filters strictly by `.c7s.zip`, copy/rename `Petalnodes-Theme.zip.c7s` to `io_calagopus_blush.c7s.zip` with identical bytes before uploading.

---

## 2. Rebuilding & Validating the Package Locally

Run both commands from the repository root:

```bash
npm run package:c7s
npm run verify:c7s
```

`verify:c7s` runs `unzip -tqq Petalnodes-Theme.zip.c7s` and checks every `distr.rs` layout requirement, metadata field, backend Cargo manifest, frontend `package.json`, and exclusion guard.

---

## 3. Pre-Flight Checks on Your VPS

Before applying changes to a live Calagopus Panel deployment:

1. **Back up the current Calagopus installation** (panel binary, `backend-extensions/`, compiled frontend assets, and database snapshot):
   ```bash
   cp -a /opt/calagopus-panel /opt/calagopus-panel.backup-$(date +%Y%m%d-%H%M%S)
   ```
2. **Verify no newer local edits exist on the VPS** compared to your Git remote before syncing files.
3. **Check disk space and toolchains** (`rustc`, `cargo`, `node`, `pnpm`) because Calagopus compiles extensions into the panel binary and frontend bundle.

---

## 4. Installation & Activation

### Option A — Calagopus CLI (`panel-rs`)

Copy `Petalnodes-Theme.zip.c7s` to your panel host and register + apply it:

```bash
# Add the extension archive to Calagopus's extension store
panel-rs extensions add ./Petalnodes-Theme.zip.c7s

# Rebuild & apply extensions into the panel workspace
panel-rs extensions apply
```

If `panel-rs extensions add` on your panel version enforces a `.c7s.zip` suffix:

```bash
cp Petalnodes-Theme.zip.c7s io_calagopus_blush.c7s.zip
panel-rs extensions add ./io_calagopus_blush.c7s.zip
panel-rs extensions apply
```

### Option B — Admin Panel UI (`Admin > Extensions`)

1. Open **Admin Panel > Extensions** in Calagopus.
2. Upload `Petalnodes-Theme.zip.c7s` (or `io_calagopus_blush.c7s.zip` if filtered by `.c7s.zip`).
3. Start the extension apply/rebuild action from the UI and monitor the build log output.

### Option C — Docker `:heavy` Deployment

1. Place the archive in the configured panel extensions volume (for example `./build/extensions/`).
2. Restart or trigger extension application in the `:heavy` container image that includes Cargo + Node/pnpm build tooling.

---

## 5. Post-Install Verification on VPS

After restarting the panel service (e.g. `systemctl restart calagopus-panel` or container restart):

1. Check service status and logs (`journalctl -u calagopus-panel -n 100 --no-pager`).
2. Load the panel in a browser and confirm:
   - Light baby-pink Petalnodes palette and typography render with no unstyled flash.
   - Real server inventory, console WebSocket/logs, files, databases, backups, schedules, startup, allocations, subusers, API keys, and SSH keys operate against live backend routes.
   - Interactive 3D `Petalnodes Sanctuary` renders cleanly (and switches to `IslandStaticFallback` under OS `prefers-reduced-motion: reduce`).
   - `DoodleCrewFooter` and top header links (`Billing`, `Discord`, `Website`, `Status`) remain functional and never overlap server actions.

---

## 6. Persistence & Rollback

### Persistence Across Panel Updates

Extensions managed through Calagopus's extension directory remain registered across panel upgrades, provided you re-run `panel-rs extensions apply` (or rebuild via Admin > Extensions) whenever upgrading the core Calagopus binary so the new panel version recompiles with `io.calagopus.blush`.

### Rollback Procedure

To revert to the default Calagopus panel theme:

```bash
panel-rs extensions remove io.calagopus.blush
panel-rs extensions apply
systemctl restart calagopus-panel
```

If a build fails mid-apply, restore the timestamped backup created in Section 3 and restart the panel service.
