import { ReactElement, useState } from "react";
import { List, Action, ActionPanel } from "@project-gauntlet/api/components";
import { Clipboard, showHud } from "@project-gauntlet/api/helpers";
import convert from "color-convert";
export default function TemplateView(): ReactElement {
  const [searchText, setSearchText] = useState<string | undefined>("");
  let searchTexthex: string
  let listitems = null;
  if (searchText) {
    if (!parseInt(searchText)) {
      try {
        listitems = (
          <>
            <List.Item
              id={convert.keyword.rgb(searchText).toString()}
              title={convert.keyword.rgb(searchText).toString()}
              subtitle={"rgb"}
            ></List.Item>
            <List.Item
              id={"#" + convert.keyword.hex(searchText).toString()}
              title={"#" + convert.keyword.hex(searchText).toString()}
              subtitle={"hex"}
            ></List.Item>
            <List.Item
              id={convert.keyword.hsl(searchText).toString()}
              title={convert.keyword.hsl(searchText).toString()}
              subtitle={"hsl"}
            ></List.Item>
            <List.Item
              id={convert.keyword.cmyk(searchText).toString()}
              title={convert.keyword.cmyk(searchText).toString()}
              subtitle={"cmyk"}
            ></List.Item>
          </>
        );
      } catch (error) {
        <List.Item
          id={"err"}
          title={"Please enter a valid color"}
          subtitle={"err"}
        ></List.Item>;
      }
    }
    else if (searchText.includes("#")) {
      searchTexthex = searchText.replace("#","0x")
      console.log(searchTexthex)
      try {
        listitems = (
          <>
            <List.Item
              id={convert.hex.keyword(searchTexthex).toString()}
              title={convert.hex.keyword(searchTexthex).toString()}
              subtitle={"name"}
            ></List.Item>
            <List.Item
              id={"#" + convert.hex.rgb(searchTexthex).toString()}
              title={"#" + convert.hex.rgb(searchTexthex).toString()}
              subtitle={"rgb"}
            ></List.Item>
            <List.Item
              id={convert.hex.hsl(searchTexthex).toString()}
              title={convert.hex.hsl(searchTexthex).toString()}
              subtitle={"hsl"}
            ></List.Item>
            <List.Item
              id={convert.hex.cmyk(searchTexthex).toString()}
              title={convert.hex.cmyk(searchTexthex).toString()}
              subtitle={"cmyk"}
            ></List.Item>
          </>
        );
      } catch (error) {
        <List.Item
          id={"err"}
          title={"Please enter a valid color"}
          subtitle={"err"}
        ></List.Item>;
      }
    }
  }
  return (
    <List
      actions={
        <ActionPanel>
          <Action
            label={`Copy color to clipboard`}
            onAction={async (id: string | undefined) => {
              console.log(id);
              if (typeof id === "string") {
                await Clipboard.writeText(id);
                showHud(`"${id}" copied to clipboard`);
              } else {
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
        onChange={setSearchText}
      />
      {listitems}
    </List>
  );
}
