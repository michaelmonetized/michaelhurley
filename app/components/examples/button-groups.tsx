import { Button } from "@/components/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group";
export default function ButtonGroupsExample() {
  return (
    <>
      <ButtonGroup>
        <Button variant="outline">Back</Button>
        <Button variant="outline">Draft</Button>
        <Button variant="default">Publish</Button>
      </ButtonGroup>
      <ButtonGroup orientation="vertical">
        <Button variant="outline">Overview</Button>
        <Button variant="outline">Schedule</Button>
        <Button variant="outline">Billing</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline">Left</Button>
        <ButtonGroupSeparator />
        <ButtonGroupText>Group text</ButtonGroupText>
        <ButtonGroupSeparator />
        <Button variant="outline">Right</Button>
      </ButtonGroup>
    </>
  );
}
