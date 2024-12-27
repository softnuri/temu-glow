import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MessageDialogButton {
  label: string;
  onClick: () => void;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

interface MessageDialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  showTitleImage?: boolean;
  message: string;
  buttons?: MessageDialogButton[];
}

export const MessageDialog = ({
  open,
  onClose,
  title,
  showTitleImage = false,
  message,
  buttons = [{ label: "확인", onClick: () => {} }],
}: MessageDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        {title && (
          <DialogHeader>
            {showTitleImage && (
              <div className="flex justify-center mb-4">
                <img
                  src="/placeholder.svg"
                  alt="Dialog Title"
                  className="w-16 h-16 object-contain"
                />
              </div>
            )}
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
        )}
        <div className="py-4">
          <p className="text-center text-muted-foreground">{message}</p>
        </div>
        <div
          className={cn(
            "flex gap-2",
            buttons.length > 1 ? "justify-end" : "justify-center"
          )}
        >
          {buttons.map((button, index) => (
            <Button
              key={index}
              variant={button.variant || "default"}
              onClick={() => {
                button.onClick();
                onClose();
              }}
            >
              {button.label}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};