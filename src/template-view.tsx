import { ReactElement, useState } from "react";
import { List, Action, ActionPanel } from "@project-gauntlet/api/components";
import { Clipboard, showHud } from "@project-gauntlet/api/helpers";
import { colord, getFormat, extend } from "colord";
import cmykPlugin from "colord/plugins/cmyk";
import namesPlugin from "colord/plugins/names"
extend([cmykPlugin, namesPlugin]);
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
    }
    else if(getFormat(searchText) == "hex"){
      try {
        listitems = (
          <>
            <List.Item
              id={colord(searchText).toName({closest: true}) ?? "no name available"}
              title={colord(searchText).toName({ closest: true }) ?? "no name available"}
              subtitle={"rgb"}
            ></List.Item>
            <List.Item
              id={colord(searchText).toRgbString()}
              title={colord(searchText).toRgbString()}
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
