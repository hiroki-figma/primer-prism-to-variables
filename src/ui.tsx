import {
  Button,
  Columns,
  Container,
  render,
  Text,
  TextboxMultiline,
  TextboxNumeric,
  Textbox,
  VerticalSpace,
} from "@create-figma-plugin/ui";
import { emit } from "@create-figma-plugin/utilities";
import { h, JSX } from "preact";
import { useState } from "preact/hooks";

import { CreateVariablesHandler } from "./types";

function Plugin() {
  const [value, setValue] = useState<string>("");
  const [step, setStep] = useState<string>("100");
  const [name, setName] = useState<string>("Colors");

  const handleCreateVariablesButtonClick = () =>
    emit<CreateVariablesHandler>("CREATE_VARIABLES", {
      step,
      name,
      value,
    });

  const handleNameInput = (event: JSX.TargetedEvent<HTMLInputElement>) =>
    setName(event.currentTarget.value);

  const handleStepInput = (event: JSX.TargetedEvent<HTMLInputElement>) =>
    setStep(event.currentTarget.value);

  return (
    <Container space="medium">
      <VerticalSpace space="large" />
      <Columns space="medium">
        <div>
          <Text>New Collection name</Text>
          <VerticalSpace space="small" />
          <Textbox onInput={handleNameInput} value={name} variant="border" />
        </div>
        <div>
          <Text>Scale</Text>
          <VerticalSpace space="small" />
          <TextboxNumeric
            onInput={handleStepInput}
            value={String(step)}
            variant="border"
          />
        </div>
      </Columns>
      <VerticalSpace space="medium" />
      <Text>Paste JSON</Text>
      <VerticalSpace space="small" />
      <TextboxMultiline
        rows={18}
        onValueInput={setValue}
        value={value}
        variant="border"
      />
      <VerticalSpace space="large" />
      <Columns space="extraSmall">
        <Button fullWidth onClick={handleCreateVariablesButtonClick}>
          Import
        </Button>
      </Columns>
      <VerticalSpace space="small" />
    </Container>
  );
}

export default render(Plugin);
