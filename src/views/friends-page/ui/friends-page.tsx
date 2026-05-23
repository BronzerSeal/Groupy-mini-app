import SearchUsersInput from "@/features/search-users-input"
import { QuickSend } from "@/widgets/quick-send"
import RecipientsList from "@/widgets/recipients-list"

const FriendsPage = () => {
  return (
    <>
      <h1 className="text-2xl font-bold">Friends</h1>
      <SearchUsersInput className="my-2" />

      <QuickSend />

      <div className="mb-17">
        <RecipientsList />
      </div>
    </>
  )
}

export default FriendsPage
