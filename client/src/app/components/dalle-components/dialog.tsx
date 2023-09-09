import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ImageCard from "./imagecard";

export function DialogDemo({ urls }: any) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Select an Image</DialogTitle>
          <DialogDescription>Choose an image to use</DialogDescription>
        </DialogHeader>
        <div className="flex flex-row gap-2">
          {urls.map((url: string) => (
            <ImageCard key={url} imageUrl={url} onClick={() => {}} />
          ))}
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
