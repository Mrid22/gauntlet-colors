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
             label={`Copy color to clipboard`}
             onAction={ async(id: string | undefined) => {
               console.log(id);
               if (typeof id === "string"){
                await Clipboard.writeText(id);
                showHud(`${id} copied to clipboard`);
               }
               else{
                showHud(`please select text to copy`);
               }
}}
            />
            </ActionPanel>
      }
    >
      <List.SearchBar/>
      <List.Item
        subtitle = {"hsl"}
        title = {convert.rgb.hsl(255,255,255).toString()}
        id = {convert.rgb.hsl(255,255,255).toString()}

        ></List.Item>
      <List.Item subtitle = {"name"} title = {convert.rgb.keyword(255,255,255).toString()} id = {convert.rgb.keyword(255,255,255).toString()}></List.Item>
    </List>
 );
}
