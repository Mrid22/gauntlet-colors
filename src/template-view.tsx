import { ReactElement, useState } from "react";
import { List, Action, ActionPanel } from "@project-gauntlet/api/components";
import { Clipboard, showHud } from "@project-gauntlet/api/helpers";
import { colord, getFormat, extend } from "colord";
import cmykPlugin from "colord/plugins/cmyk";
import namesPlugin from "colord/plugins/names";
extend([cmykPlugin, namesPlugin]);
export default function TemplateView(): ReactElement {
  const [searchText, setSearchText] = useState<string | undefined>("");
  let listitems = null;
  if (searchText) {
    let listItemName = (
      <List.Item
        id={colord(searchText).toName({ closest: true }) ?? "no name available"}
        title={
          colord(searchText).toName({ closest: true }) ?? "no name available"
        }
        subtitle={"name"}
      ></List.Item>
    );
    let listItemHex = (
      <List.Item
        id={colord(searchText).toHex()}
        title={colord(searchText).toHex()}
        subtitle={"hex"}
      ></List.Item>
    );
    let listItemRgb = (
      <List.Item
        id={colord(searchText).toRgbString()}
        title={colord(searchText).toRgbString()}
        subtitle={"rgb"}
      ></List.Item>
    );
    let listItemHsl = (
      <List.Item
        id={colord(searchText).toHslString()}
        title={colord(searchText).toHslString()}
        subtitle={"hsl"}
      ></List.Item>
    );
    let listItemCmyk = (
      <List.Item
        id={colord(searchText).toCmykString().replace("device-cmyk","cmyk")}
        title={colord(searchText).toCmykString().replace("device-cmyk","cmyk")}
        subtitle={"cmyk"}
      ></List.Item>
    );
    let listItemErr = (
      <List.Item
        id={"err"}
        title={"Please enter a valid color"}
        subtitle={"err"}
      ></List.Item>
    );
    if (getFormat(searchText) == "name") {
      try {
        listitems = (
          <>
            {listItemHex}
            {listItemRgb}
            {listItemHsl}
            {listItemCmyk}
          </>
        );
      } catch (error) {
        {
          listItemErr;
        }
      }
    } else if (getFormat(searchText) == "hex") {
      try {
        listitems = (
          <>
            {listItemName}
            {listItemRgb}
            {listItemHsl}
            {listItemCmyk}
          </>
        );
      } catch (error) {
        {
          listItemErr;
        }
      }
    } else if (getFormat(searchText) == "rgb") {
      try {
        listitems = (
          <>
            {listItemName}
            {listItemHex}
            {listItemHsl}
            {listItemCmyk}
          </>
        );
      } catch (error) {
        {
          listItemErr;
        }
      }
    } else if (getFormat(searchText) == "hsl") {
      try {
        listitems = (
          <>
            {listItemName}
            {listItemHex}
            {listItemRgb}
            {listItemCmyk}
          </>
        );
      } catch (error) {
        {
          listItemErr;
        }
      }
    } else if (getFormat(searchText) == "cmyk") {
      try {
        listitems = (
          <>
            {listItemName}
            {listItemHex}
            {listItemRgb}
            {listItemHsl}
          </>
        );
      } catch (error) {
        {
          listItemErr;
        }
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
