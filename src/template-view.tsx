import { ReactElement, useState } from "react";
import { List, Action, ActionPanel } from "@project-gauntlet/api/components";
import { Clipboard, showHud } from "@project-gauntlet/api/helpers";
import { colord, getFormat, extend } from "colord";
import cmykPlugin from "colord/plugins/cmyk";
extend([cmykPlugin]);
export default function TemplateView(): ReactElement {
  const [searchText, setSearchText] = useState<string | undefined>("");
  let searchTexthex: string;
  let listitems = null;
  if (searchText) {
    if (getFormat(searchText) == "name") {
      try {
        listitems = (
          <>
            <List.Item
              id={colord(searchText).toRgbString()}
              title={colord(searchText).toRgbString()}
              subtitle={"rgb"}
            ></List.Item>
            <List.Item
              id={colord(searchText).toHex()}
              title={colord(searchText).toHex()}
              subtitle={"hex"}
            ></List.Item>
            <List.Item
              id={colord(searchText).toHslString()}
              title={colord(searchText).toHslString()}
              subtitle={"hsl"}
            ></List.Item>
            <List.Item
              id={colord(searchText).toCmykString()}
              title={colord(searchText).toCmykString()}
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
      searchTexthex = searchText;
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
        console.log("h");
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
