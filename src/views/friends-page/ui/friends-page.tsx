import SearchUsersInput from "@/features/search-users-input"
import { SquigglyText } from "@/shared/ui/squiggly-text"
import { QuickSend } from "@/widgets/quick-send"
import RecipientsList from "@/widgets/recipients-list"

const FriendsPage = () => {
  return (
    <>
      <h1 className="text-2xl font-bold">
        <SquigglyText steps={12} stepDuration={120} scale={[3, 5]}>
          Friends
        </SquigglyText>
      </h1>
      <SearchUsersInput className="my-2" />

      <QuickSend />

      <div className="mb-17">
        <RecipientsList />
      </div>
    </>
  )
}

export default FriendsPage
