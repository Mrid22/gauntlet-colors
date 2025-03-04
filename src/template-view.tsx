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
            //checking keyword
            if (RegExp(/^[a-z]+$/gi).test(searchText)) {
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
                    id={"hex"}>
                  </List.Item>
                  <List.Item
                    subtitle={"hsl"}
                    title={convert.keyword.hsl(searchText).toString()}
                    id={"hsl"}
                  ></List.Item>
                  <List.Item
                    subtitle={"cmyk"}
                    title={convert.keyword.cmyk(searchText).toString()}
                    id={"cmyk"}
                  ></List.Item>
                </>
              )
            }
            //checking hexcode
            else if(searchText.includes("#") && searchText.length == 7){
              return(
                <>
                <List.Item
                    subtitle={"name"}
                    title={convert.hex.keyword(searchText).toString()}
                    id={"rgb"}
                  >
                  </List.Item>
                  <List.Item
                    subtitle={"rgb"}
                    title={convert.hex.rgb(searchText).toString()}
                    id={"hex"}>
                  </List.Item>
                  <List.Item
                    subtitle={"hsl"}
                    title={convert.hex.hsl(searchText).toString()}
                    id={"hsl"}
                  ></List.Item>
                  <List.Item
                    subtitle={"cmyk"}
                    title={convert.hex.cmyk(searchText).toString()}
                    id={"cmyk"}
                  ></List.Item>
                </>
              )
            }
          }
        }}
      />
    </List>
  );
}
