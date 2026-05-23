export const getUserDisplayName = (
  firstName: string | null,
  lastName: string | null,
  username: string | null
) => {
  const fullName = [firstName, lastName].filter(Boolean).join(" ").trim()

  if (fullName) return fullName
  if (username) return `@${username}`

  return "Unknown user"
}
