module.exports = `
type AuditDateTime {
  timestamp: Timestamp,
  iso8601: String,
  server: String
}

type Audit {
  date: AuditDateTime
}
`;