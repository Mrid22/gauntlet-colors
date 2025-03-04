import { ReactElement, useState } from "react";
import { List, Action, ActionPanel } from "@project-gauntlet/api/components";
import { Clipboard, showHud } from "@project-gauntlet/api/helpers";
import convert from "color-convert";
import chroma from "chroma-js";
export default function TemplateView(): ReactElement {
  const [searchText, setSearchText] = useState<string | undefined>("");
  let searchTexthex: string;
  let listitems = null;
  if (searchText) {
    if (!parseInt(searchText)) {
      try {
        listitems = (
          <>
            <List.Item
              id={chroma(searchText).rgb().toString()}
              title={chroma(searchText).rgb().toString()}
              subtitle={"rgb"}
            ></List.Item>
            <List.Item
              id={chroma(searchText).hex().toString()}
              title={chroma(searchText).hex().toString()}
              subtitle={"hex"}
            ></List.Item>
            <List.Item
              id={chroma(searchText).hsl().toString()}
              title={chroma(searchText).hsl().toString()}
              subtitle={"hsl"}
            ></List.Item>
            <List.Item
              id={chroma(searchText).cmyk().toString()}
              title={chroma(searchText).cmyk().toString()}
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
    } else if (searchText.length == 6) {
      if (searchText.includes("#")) {
        searchTexthex = searchText.replace("#", "");
      }
      else{
        searchTexthex = searchText
      }
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
        console.log("h")
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
