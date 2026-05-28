export const getCurrentMonthRange = () => {
  const now = new Date()
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
  const nextMonthStart = new Date(now.getFullYear(), now.getMonth() + 1, 1)

  return {
    monthStart,
    nextMonthStart,
  }
}
