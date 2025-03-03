import { ReactElement } from "react";
import { List, Action, ActionPanel } from "@project-gauntlet/api/components";
import {
  GeneratedEntrypoint,
  GeneratedEntrypointAccessory,
  GeneratedEntrypointAction,
  Clipboard,
  showHud
} from "@project-gauntlet/api/helpers";
import convert from 'color-convert';
export default function TemplateView(): ReactElement {
  return (
    <List
      actions={
        <ActionPanel>
          <Action
            label={`Copy color to clipboard`}
            onAction={async (title: string | undefined) => {
              console.log(title);
              if (typeof title === "string") {
                await Clipboard.writeText(title);
                showHud(`"${title}" copied to clipboard`);
              }
              else {
                showHud(`please select text to copy`);
              }
            }}
          />
        </ActionPanel>
      }
    >
      <List.SearchBar />
      <List.Item
        subtitle={"hsl"}
        title={convert.rgb.hsl(255, 255, 255).toString()}
        id={"hsl"}
      >
      </List.Item>
      <List.Item
        subtitle={"name"}
        title={convert.rgb.keyword(255, 255, 255).toString()}
        id={"name"}>
      </List.Item>
    </List>
  );
}
