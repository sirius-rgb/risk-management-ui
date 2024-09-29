import { User } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const fakeEmails = ["demo.test@example.com"]
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Terms and Condition
          </DialogTitle>
          <DialogDescription className="text-md max-h-72 overflow-y-scroll text-ellipsis  ">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum nemo
            fugit laboriosam voluptates praesentium optio totam vero,
            dignissimos voluptatem adipisci tempora dolor esse in. Laudantium
            numquam possimus adipisci explicabo iste? Lorem ipsum, dolor sit
            amet consectetur adipisicing elit. Eum nemo fugit laboriosam
            voluptates praesentium optio totam vero, dignissimos voluptatem
            adipisci tempora dolor esse in. Laudantium numquam possimus adipisci
            explicabo iste?onsectetur adipisicing elit. Eum nemo fugit
            laboriosam voluptates praesentium optio totam vero, dignissimos
            voluptatem adipisci tempora dolor esse in. Laudantium numquam
            possimus adipisci explicabo iste?onsectetur adipisicing elit. Eum
            nemo fugit laboriosam voluptates praesentium optio totam vero,
            dignissimos voluptatem adipisci tempora dolor esse in. Laudantium
            numquam possimus adipisci explicabo iste?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-row justify-around sm:justify-evenly">
          <Button onClick={onClose}>Accept</Button>
          <Button onClick={onClose} variant="outline">
            Decline
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default LoginModal
