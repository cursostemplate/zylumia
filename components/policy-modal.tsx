import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface PolicyModalProps {
  triggerText: string;
  title: string;
  children: React.ReactNode;
}

export function PolicyModal({ triggerText, title, children }: PolicyModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-muted-foreground hover:text-primary transition-colors">{triggerText}</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-lora">{title}</DialogTitle>
        </DialogHeader>
        <div className="prose prose-sm max-h-[60vh] overflow-y-auto pr-4 text-sm text-muted-foreground">
          {children}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
