import { ReactElement, useState } from "react";
import { List, Action, ActionPanel } from "@project-gauntlet/api/components";
import {
  Clipboard,
  showHud
} from "@project-gauntlet/api/helpers";
import convert from 'color-convert';
const [searchText, setSearchText] = useState<string | undefined>("");
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
      <List.SearchBar
        placeholder={"Search a color in any format you want"}
        value={searchText}
        onChange={(searchText) => {
          if (searchText) {
            if (!parseInt(searchText)) {
              return (
                <>
                  <List.Item
                    subtitle={"rgb"}
                    title={convert.keyword.rgb(searchText).toString()}
                    id={"rgb"}
                  >
                  </List.Item>
                  <List.Item
                    subtitle={"hex"}
                    title={convert.keyword.hex(searchText).toString()}
                    id={"name"}>
                  </List.Item>
                </>
              )
            }
          }
        }}
      />
    </List>
  );
}
