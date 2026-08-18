# INSP AUTO private admin setup

The private administration area is available at `/admin/login`. It is separate from the public marketing pages and uses server-side email/password authentication followed by a six-digit email OTP. Passwords are stored only as scrypt hashes in the database; the browser receives only a secure HttpOnly session cookie after OTP verification.

Configure the following values in the production server environment. Do not commit them to GitHub or place them in frontend code.

| Variable                                | Purpose                                                                                |
| --------------------------------------- | -------------------------------------------------------------------------------------- |
| `DATABASE_URL`                          | Production MySQL/TiDB connection string.                                               |
| `ADMIN_EMAIL`                           | Administrator email used for the first credential bootstrap.                           |
| `ADMIN_INITIAL_PASSWORD`                | Temporary bootstrap password; remove it after the database credential is created.      |
| `ADMIN_OTP_PEPPER`                      | Long random secret for HMAC-hashing OTP codes.                                         |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE` | Hostinger SMTP connection settings.                                                    |
| `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`   | Server-only mailbox credentials and sender. Rotate any password that has been exposed. |
| `CONTACT_TO`                            | Administrator mailbox for public contact notifications.                                |
| `WHOP_WEBHOOK_SECRET`                   | Whop Standard Webhooks signing secret.                                                 |
| `WHOP_COMPANY_ID`                       | Whop business/company identifier used to ignore foreign events safely.                 |

The public contact endpoint persists a validated submission before attempting notification. Notification failure does not delete the saved submission and does not expose SMTP details to the visitor. Admin mutations require the admin session cookie and same-origin requests.

The project remains npm-compatible for Hostinger. Use `npm install`, `npm run check`, `npm run build`, and `npm start`. The managed Manus preview may still show its separate forced-pnpm dependency-check failure; that is an environment limitation and is not part of the Hostinger deployment path.

No customer, order, review, payment, or analytics data is seeded by this feature.

## Hostinger deployment checklist

In Hostinger’s Node.js application environment, add these variables individually; do not place them in React code or commit them to the repository: `DATABASE_URL`, `ADMIN_EMAIL`, `ADMIN_INITIAL_PASSWORD`, `ADMIN_OTP_PEPPER`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`, `CONTACT_TO`, `WHOP_WEBHOOK_SECRET`, and `WHOP_COMPANY_ID`. Keep `JWT_SECRET` configured as well because it is part of the existing server template. The admin password is the value for `ADMIN_INITIAL_PASSWORD`; it is not an API password and should be rotated or removed after the first credential bootstrap.

After saving the variables, rebuild and restart the Hostinger Node.js application. The app trusts one reverse proxy and compares the browser `Origin` against the forwarded HTTPS protocol and host. This prevents Hostinger’s internal HTTP-to-HTTPS proxy from incorrectly returning `Forbidden` while still rejecting a genuinely foreign origin. The first login must use the exact `ADMIN_EMAIL` and `ADMIN_INITIAL_PASSWORD`; the server creates the initial credential row only when those values match and the database is reachable. It then sends the OTP through the configured SMTP mailbox and sets the secure admin cookie after successful verification.

If the login page still returns `Forbidden` after restart, check that the public URL, forwarded host, and HTTPS binding are consistent, and that the browser is not opening the site through a different hostname such as a `www` variant. If it returns `Invalid credentials` or `Authentication email is not configured`, the proxy issue is resolved and the remaining problem is the corresponding admin or SMTP environment value.
