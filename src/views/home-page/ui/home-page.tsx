import { initData } from "@tma.js/sdk-react"

const HomePage = () => {
  const user = initData.user()

  console.log(user)

  return (
    <div className="flex min-h-svh p-6">
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        <div>
          <h1 className="font-medium">Project ready!</h1>
          <p>HI {user?.first_name}</p>
        </div>
      </div>
    </div>
  )
}

export default HomePage
