"use client";
import { Button } from "@/components/ui/button"


function NewGame() {
  return (
    <form action={"/api/chess"} method="POST">
      <Button type="submit">
        new game
      </Button>
    </form>
  )
}

export default NewGame