import { and, desc, eq, gt, isNull, lt, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  adminCredentials,
  adminSessions,
  auditLogs,
  contactSubmissions,
  InsertUser,
  orders,
  otpChallenges,
  User,
  users,
  webhookEvents,
} from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) return;
  const values: InsertUser = { openId: user.openId };
  const updateSet: Record<string, unknown> = {};
  const textFields = ["name", "email", "loginMethod"] as const;
  for (const field of textFields) {
    if (user[field] !== undefined) {
      values[field] = user[field] ?? null;
      updateSet[field] = user[field] ?? null;
    }
  }
  if (user.lastSignedIn !== undefined) {
    values.lastSignedIn = user.lastSignedIn;
    updateSet.lastSignedIn = user.lastSignedIn;
  }
  if (user.role !== undefined || user.openId === ENV.ownerOpenId) {
    values.role = user.role ?? "admin";
    updateSet.role = values.role;
  }
  values.lastSignedIn ??= new Date();
  updateSet.lastSignedIn ??= new Date();
  await db
    .insert(users)
    .values(values)
    .onDuplicateKeyUpdate({ set: updateSet });
}

export async function getUserByOpenId(
  openId: string
): Promise<User | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db
    .select()
    .from(users)
    .where(eq(users.openId, openId))
    .limit(1);
  return result[0];
}

export async function getAdminCredential(email: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db
    .select()
    .from(adminCredentials)
    .where(eq(adminCredentials.email, email))
    .limit(1);
  return result[0];
}

export async function createAdminCredential(
  email: string,
  passwordHash: string
) {
  const db = await getDb();
  if (!db) return false;
  await db.insert(adminCredentials).values({ email, passwordHash, enabled: 1 });
  return true;
}

export async function invalidateOtpChallenges(email: string) {
  const db = await getDb();
  if (!db) return;
  await db
    .update(otpChallenges)
    .set({ consumedAt: new Date() })
    .where(
      and(eq(otpChallenges.email, email), isNull(otpChallenges.consumedAt))
    );
}

export async function createOtpChallenge(
  email: string,
  codeHash: string,
  expiresAt: Date
) {
  const db = await getDb();
  if (!db) return false;
  await db
    .insert(otpChallenges)
    .values({ email, codeHash, expiresAt, attempts: 0 });
  return true;
}

export async function getLatestOtpChallenge(email: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db
    .select()
    .from(otpChallenges)
    .where(
      and(
        eq(otpChallenges.email, email),
        isNull(otpChallenges.consumedAt),
        gt(otpChallenges.expiresAt, new Date())
      )
    )
    .orderBy(desc(otpChallenges.createdAt))
    .limit(1);
  return result[0];
}

export async function incrementOtpAttempts(id: number) {
  const db = await getDb();
  if (!db) return;
  await db
    .update(otpChallenges)
    .set({ attempts: sql`${otpChallenges.attempts} + 1` })
    .where(eq(otpChallenges.id, id));
}

export async function consumeOtpChallenge(id: number) {
  const db = await getDb();
  if (!db) return;
  await db
    .update(otpChallenges)
    .set({ consumedAt: new Date() })
    .where(eq(otpChallenges.id, id));
}

export async function createAdminSession(
  email: string,
  tokenHash: string,
  expiresAt: Date
) {
  const db = await getDb();
  if (!db) return false;
  await db.insert(adminSessions).values({ email, tokenHash, expiresAt });
  return true;
}

export async function getActiveAdminSession(tokenHash: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db
    .select()
    .from(adminSessions)
    .where(
      and(
        eq(adminSessions.tokenHash, tokenHash),
        isNull(adminSessions.revokedAt),
        gt(adminSessions.expiresAt, new Date())
      )
    )
    .limit(1);
  return result[0];
}

export async function revokeAdminSession(tokenHash: string) {
  const db = await getDb();
  if (!db) return;
  await db
    .update(adminSessions)
    .set({ revokedAt: new Date() })
    .where(eq(adminSessions.tokenHash, tokenHash));
}

export async function createAuditLog(input: {
  actorEmail?: string;
  action: string;
  entityType?: string;
  entityId?: string;
  requestId?: string;
  metadata?: Record<string, unknown>;
}) {
  const db = await getDb();
  if (!db) return;
  await db.insert(auditLogs).values({
    actorEmail: input.actorEmail,
    action: input.action,
    entityType: input.entityType,
    entityId: input.entityId,
    requestId: input.requestId,
    metadata: input.metadata ? JSON.stringify(input.metadata) : undefined,
  });
}

export async function createContact(input: {
  name: string;
  email: string;
  phone?: string;
  vin?: string;
  orderNumber?: string;
  subject: string;
  message: string;
}) {
  const db = await getDb();
  if (!db) return undefined;
  await db.insert(contactSubmissions).values(input);
  const rows = await db
    .select()
    .from(contactSubmissions)
    .where(eq(contactSubmissions.email, input.email))
    .orderBy(desc(contactSubmissions.createdAt))
    .limit(1);
  return rows[0];
}

export async function listContacts() {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(contactSubmissions)
    .orderBy(desc(contactSubmissions.createdAt));
}

export async function updateContact(
  id: number,
  input: {
    status?: "new" | "read" | "in_progress" | "replied" | "resolved";
    internalNotes?: string | null;
  }
) {
  const db = await getDb();
  if (!db) return undefined;
  await db
    .update(contactSubmissions)
    .set(input)
    .where(eq(contactSubmissions.id, id));
  const rows = await db
    .select()
    .from(contactSubmissions)
    .where(eq(contactSubmissions.id, id))
    .limit(1);
  return rows[0];
}

export async function deleteContact(id: number) {
  const db = await getDb();
  if (!db) return;
  await db.delete(contactSubmissions).where(eq(contactSubmissions.id, id));
}

export async function getDashboardCounts() {
  const db = await getDb();
  if (!db)
    return {
      contacts: 0,
      newContacts: 0,
      inProgressContacts: 0,
      resolvedContacts: 0,
      awaitingOrders: 0,
      processingOrders: 0,
      readyOrders: 0,
      failedOrders: 0,
    };
  const [
    contacts,
    newContacts,
    inProgressContacts,
    resolvedContacts,
    awaitingOrders,
    processingOrders,
    readyOrders,
    failedOrders,
  ] = await Promise.all([
    db.select({ count: sql<number>`count(*)` }).from(contactSubmissions),
    db
      .select({ count: sql<number>`count(*)` })
      .from(contactSubmissions)
      .where(eq(contactSubmissions.status, "new")),
    db
      .select({ count: sql<number>`count(*)` })
      .from(contactSubmissions)
      .where(eq(contactSubmissions.status, "in_progress")),
    db
      .select({ count: sql<number>`count(*)` })
      .from(contactSubmissions)
      .where(eq(contactSubmissions.status, "resolved")),
    db
      .select({ count: sql<number>`count(*)` })
      .from(orders)
      .where(
        and(
          eq(orders.paymentStatus, "paid"),
          eq(orders.fulfillmentStatus, "pending")
        )
      ),
    db
      .select({ count: sql<number>`count(*)` })
      .from(orders)
      .where(eq(orders.fulfillmentStatus, "processing")),
    db
      .select({ count: sql<number>`count(*)` })
      .from(orders)
      .where(eq(orders.fulfillmentStatus, "completed")),
    db
      .select({ count: sql<number>`count(*)` })
      .from(orders)
      .where(eq(orders.fulfillmentStatus, "failed")),
  ]);
  return {
    contacts: Number(contacts[0]?.count ?? 0),
    newContacts: Number(newContacts[0]?.count ?? 0),
    inProgressContacts: Number(inProgressContacts[0]?.count ?? 0),
    resolvedContacts: Number(resolvedContacts[0]?.count ?? 0),
    awaitingOrders: Number(awaitingOrders[0]?.count ?? 0),
    processingOrders: Number(processingOrders[0]?.count ?? 0),
    readyOrders: Number(readyOrders[0]?.count ?? 0),
    failedOrders: Number(failedOrders[0]?.count ?? 0),
  };
}

export async function syncOrderFromWebhook(input: {
  orderId?: number;
  customerName?: string;
  deliveryEmail?: string;
  selectedPlan?: string;
  amountPence?: number;
  vin?: string;
  paymentReference?: string;
  paymentStatus: "paid" | "failed";
}) {
  const db = await getDb();
  if (!db) return undefined;
  const now = new Date();
  if (Number.isInteger(input.orderId) && (input.orderId ?? 0) > 0) {
    const updateSet = {
      paymentStatus: input.paymentStatus,
      paymentReference: input.paymentReference,
      paidAt: input.paymentStatus === "paid" ? now : undefined,
    } as const;
    await db.update(orders).set(updateSet).where(eq(orders.id, input.orderId!));
    const rows = await db
      .select()
      .from(orders)
      .where(eq(orders.id, input.orderId!))
      .limit(1);
    return rows[0];
  }
  if (
    !input.customerName ||
    !input.deliveryEmail ||
    !input.selectedPlan ||
    !Number.isInteger(input.amountPence) ||
    (input.amountPence ?? -1) < 0
  )
    return undefined;
  const amountPence = input.amountPence as number;
  await db.insert(orders).values({
    customerName: input.customerName,
    deliveryEmail: input.deliveryEmail,
    selectedPlan: input.selectedPlan,
    amountPence,
    vin: input.vin,
    paymentReference: input.paymentReference,
    paymentStatus: input.paymentStatus,
    paidAt: input.paymentStatus === "paid" ? now : undefined,
  });
  const rows = await db
    .select()
    .from(orders)
    .where(eq(orders.deliveryEmail, input.deliveryEmail))
    .orderBy(desc(orders.createdAt))
    .limit(1);
  return rows[0];
}

export async function listAuditLogs() {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(auditLogs)
    .orderBy(desc(auditLogs.createdAt))
    .limit(200);
}

export async function getOrderStatusByOwner(
  email: string,
  paymentReference: string
) {
  const db = await getDb();
  if (!db) return undefined;
  const rows = await db
    .select({
      id: orders.id,
      selectedPlan: orders.selectedPlan,
      paymentStatus: orders.paymentStatus,
      fulfillmentStatus: orders.fulfillmentStatus,
      paidAt: orders.paidAt,
      createdAt: orders.createdAt,
    })
    .from(orders)
    .where(
      and(
        eq(orders.deliveryEmail, email),
        eq(orders.paymentReference, paymentReference)
      )
    )
    .limit(1);
  return rows[0];
}

export async function listOrders() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(orders).orderBy(desc(orders.createdAt));
}

export async function updateOrderFulfillment(
  id: number,
  fulfillmentStatus: "pending" | "processing" | "completed" | "failed",
  paymentReference?: string
) {
  const db = await getDb();
  if (!db) return undefined;
  await db
    .update(orders)
    .set({ fulfillmentStatus, paymentReference })
    .where(eq(orders.id, id));
  const rows = await db.select().from(orders).where(eq(orders.id, id)).limit(1);
  return rows[0];
}

export async function hasWebhookEvent(eventId: string) {
  const db = await getDb();
  if (!db) return false;
  const rows = await db
    .select({ id: webhookEvents.id })
    .from(webhookEvents)
    .where(eq(webhookEvents.eventId, eventId))
    .limit(1);
  return rows.length > 0;
}

export async function recordWebhookEvent(input: {
  eventId: string;
  eventType: string;
  companyId?: string;
  signatureValid: number;
  processedAt?: Date;
}) {
  const db = await getDb();
  if (!db) return;
  await db.insert(webhookEvents).values(input);
}
