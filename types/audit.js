module.exports = `
type AuditUser {
  id: ID,
  username: String,
  organizationName: String,
  organizationId: ID,
}

type AuditDateTime {
  timestamp: Timestamp,
  iso8601: String,
  server: String
}

type Audit {
  user: AuditUser,
  date: AuditDateTime
}
`;