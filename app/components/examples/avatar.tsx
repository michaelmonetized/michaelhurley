import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar";
export default function AvatarExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Avatar>
        <AvatarImage src="https://placecats.com/80/80" alt="Cat avatar" />
        <AvatarFallback>HL</AvatarFallback>
        <AvatarBadge />
      </Avatar>
      <AvatarGroup>
        <Avatar>
          <AvatarFallback>MH</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>CL</AvatarFallback>
        </Avatar>
        <AvatarGroupCount>+4</AvatarGroupCount>
      </AvatarGroup>
    </div>
  );
}
