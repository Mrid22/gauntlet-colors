import { ReactElement } from "react";
import { List, Action, ActionPanel} from "@project-gauntlet/api/components";
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
      actions = {
        <ActionPanel>
           <Action
             label={`Copy ${convert.rgb.hsl(255,255,255).toString()} to clipboard`}
             onAction={ async(id: string | undefined) => {
               console.log(convert.rgb.hsl(255,255,255).toString());
               await Clipboard.writeText(convert.rgb.hsl(255,255,255).toString());
               showHud(`${convert.rgb.hsl(255,255,255).toString()} copied to clipboard`);
}}
            />
            </ActionPanel>
      }
    >
      <List.SearchBar/>
      <List.Item
        subtitle = {"hsl"}
        title = {convert.rgb.hsl(255,255,255).toString()}
        id = {"hsl"}

        ></List.Item>
      <List.Item subtitle = {"name"} title = {convert.rgb.keyword(255,255,255).toString()} id = {"name"}></List.Item>
    </List>
 );
}
