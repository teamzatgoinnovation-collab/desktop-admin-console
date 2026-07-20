# admin-console-desktop

**Status:** Runnable Electron scaffold (mock admin data)  
**Kind:** Electron + Vite + React  
**Backend:** `site + all apps` (ERPNext password login via Electron main; CRUD is local mock until admin APIs exist)  
**Stack:** [FRONTEND_STACK](../../Docs/Foundation/FRONTEND_STACK.md)

Desktop console for users, roles, companies, branches, audit logs, and API keys.

## Auth

Sign in with an ERPNext / Frappe **site URL + email/password**. Login runs in the Electron main process via `@zatgo/erpnext` (avoids CORS) and keeps the Frappe session cookie (`sid`) there.

Use **Continue offline** on the login screen to browse mock data without a site.

## Run

From the workspace root:

```bash
pnpm install
pnpm dev:admin-console
```

Or:

```bash
pnpm --filter @zatgo/admin-console-desktop dev
```

Optional env (picked up by Vite for the default base URL):

```bash
VITE_FRAPPE_BASE_URL=https://demo.zatgo.online pnpm dev:admin-console
```

Default site URL matches ERPNext development publish port (`8082`).

## Scripts

| Script | Description |
|--------|-------------|
| `dev` | Vite + Electron (port 5174) |
| `build` | Typecheck + production renderer/electron build |
| `typecheck` | `tsc` for renderer and electron/config |

## Workspace packages

```json
{
  "dependencies": {
    "@zatgo/ui": "workspace:*",
    "@zatgo/sdk": "workspace:*",
    "@zatgo/auth": "workspace:*",
    "@zatgo/erpnext": "workspace:*",
    "@zatgo/icons": "workspace:*"
  }
}
```

Feature pages stay on mock repositories until site admin APIs are wired through `@zatgo/sdk`.
