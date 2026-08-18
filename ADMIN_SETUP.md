# INSP AUTO private admin setup

The private administration area is available at `/admin/login`. It is separate from the public marketing pages and uses server-side email/password authentication followed by a six-digit email OTP. Passwords are stored only as scrypt hashes in the database; the browser receives only a secure HttpOnly session cookie after OTP verification.

Configure the following values in the production server environment. Do not commit them to GitHub or place them in frontend code.

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Production MySQL/TiDB connection string. |
| `ADMIN_EMAIL` | Administrator email used for the first credential bootstrap. |
| `ADMIN_INITIAL_PASSWORD` | Temporary bootstrap password; remove it after the database credential is created. |
| `ADMIN_OTP_PEPPER` | Long random secret for HMAC-hashing OTP codes. |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE` | Hostinger SMTP connection settings. |
| `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM` | Server-only mailbox credentials and sender. Rotate any password that has been exposed. |
| `CONTACT_TO` | Administrator mailbox for public contact notifications. |
| `WHOP_WEBHOOK_SECRET` | Whop Standard Webhooks signing secret. |
| `WHOP_COMPANY_ID` | Whop business/company identifier used to ignore foreign events safely. |

The public contact endpoint persists a validated submission before attempting notification. Notification failure does not delete the saved submission and does not expose SMTP details to the visitor. Admin mutations require the admin session cookie and same-origin requests.

The project remains npm-compatible for Hostinger. Use `npm install`, `npm run check`, `npm run build`, and `npm start`. The managed Manus preview may still show its separate forced-pnpm dependency-check failure; that is an environment limitation and is not part of the Hostinger deployment path.

No customer, order, review, payment, or analytics data is seeded by this feature.
