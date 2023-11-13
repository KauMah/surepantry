import { relations } from "drizzle-orm";
import { serial, text, pgTable, timestamp, index, integer, primaryKey, pgTableCreator } from "drizzle-orm/pg-core"
import { type AdapterAccount } from "next-auth/adapters"

export const postgresTable = pgTableCreator((name) => `surepantry_${name}`);

export const posts = postgresTable("post", {
    id: serial("id").primaryKey(),
    name: text('name'),
    createdById: text('createById').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow(),
},
(example) => {
    return  {
        createdByIDIdx: index("createdById_idx").on(example.createdById),
        nameIndex: index('name_idx').on(example.name)
    }
})

export const users = postgresTable("user", {
    id: text("id").notNull().primaryKey(),
    name: text('name'),
    email: text('email').notNull(),
    emailVerified: timestamp('emailVerified', {mode: 'date', precision: 3}).defaultNow(),
    image: text('image')
});

export const userRelations = relations(users, ({ many }) => ({
    accounts: many(accounts),
}));

export const accounts = postgresTable('account', {
    userId: text('userId').notNull(),
    type: text('type').$type<AdapterAccount['type']>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state')
},
(account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
    userIdIdx: index('userId_idx').on(account.userId),
})
);

export const accountsRelations = relations(accounts, ({ one }) => ({
    user: one(users, { fields: [accounts.userId], references: [users.id]})
}));

export const sessions = postgresTable(
    'session',
    {
        sessionToken: text('sessionToken')
        .notNull()
        .primaryKey(),
        userId: text('userId').notNull(),
        expires: timestamp('expires', { mode: 'date' }).notNull(),
    },
    (session) => ({
        userIdIdx: index('userId_idx').on(session.userId),
    })
);

export const verificationTokens = postgresTable(
    'verificationToken',
    {
        identifier: text('identifier').notNull(),
        token: text('token').notNull(),
        expires: timestamp('expires', { mode: 'date' }).notNull(),
    },
    (vt) => ({
        compoundKey: primaryKey(vt.identifier, vt.token),
    })
);