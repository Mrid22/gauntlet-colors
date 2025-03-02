import { ReactElement } from "react";
import { List} from "@project-gauntlet/api/components";
import { Environment, Clipboard, showHud } from "@project-gauntlet/api/helpers";
import convert from 'color-convert';

export default function TemplateView(): ReactElement {
  return (
    <List>
      <List.SearchBar/>
      <List.Item subtitle = {"hsl"} title = {"convert.rgb.hsl(255,255,255)"} id = {"hsl"}></List.Item>
      <List.Item subtitle = {"name"} title = {convert.rgb.keyword(255,255,255).toString()} id = {"name"}></List.Item>
    </List>
    );
}
