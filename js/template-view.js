import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useState } from 'react';
import { List, ActionPanel, Action } from '@project-gauntlet/api/components';
import { Clipboard, showHud } from '@project-gauntlet/api/helpers';
import { k, w, I, c as cmykPlugin, n as namesPlugin } from './vendor.js';

k([cmykPlugin, namesPlugin]);
function TemplateView() {
    const [searchText, setSearchText] = useState("");
    let listitems = null;
    if (searchText) {
        let listItemName = (jsx(List.Item, { id: w(searchText).toName({ closest: true }) ?? "no name available", title: w(searchText).toName({ closest: true }) ?? "no name available", subtitle: "name" }));
        let listItemHex = (jsx(List.Item, { id: w(searchText).toHex(), title: w(searchText).toHex(), subtitle: "hex" }));
        let listItemRgb = (jsx(List.Item, { id: w(searchText).toRgbString(), title: w(searchText).toRgbString(), subtitle: "rgb" }));
        let listItemHsl = (jsx(List.Item, { id: w(searchText).toHslString(), title: w(searchText).toHslString(), subtitle: "hsl" }));
        let listItemCmyk = (jsx(List.Item, { id: w(searchText).toCmykString(), title: w(searchText).toCmykString(), subtitle: "cmyk" }));
        (jsx(List.Item, { id: "err", title: "Please enter a valid color", subtitle: "err" }));
        if (I(searchText) == "name") {
            try {
                listitems = (jsxs(Fragment, { children: [listItemHex, listItemRgb, listItemHsl, listItemCmyk] }));
            }
            catch (error) {
            }
        }
        else if (I(searchText) == "hex") {
            try {
                listitems = (jsxs(Fragment, { children: [listItemName, listItemRgb, listItemHsl, listItemCmyk] }));
            }
            catch (error) {
            }
        }
        else if (I(searchText) == "rgb") {
            try {
                listitems = (jsxs(Fragment, { children: [listItemName, listItemHex, listItemHsl, listItemCmyk] }));
            }
            catch (error) {
            }
        }
        else if (I(searchText) == "hsl") {
            try {
                listitems = (jsxs(Fragment, { children: [listItemName, listItemHex, listItemRgb, listItemCmyk] }));
            }
            catch (error) {
            }
        }
        else if (I(searchText) == "cmyk") {
            try {
                listitems = (jsxs(Fragment, { children: [listItemName, listItemHex, listItemRgb, listItemHsl] }));
            }
            catch (error) {
            }
        }
    }
    return (jsxs(List, { actions: jsx(ActionPanel, { children: jsx(Action, { label: `Copy color to clipboard`, onAction: async (id) => {
                    if (typeof id === "string") {
                        await Clipboard.writeText(id);
                        showHud(`"${id}" copied to clipboard`);
                    }
                    else {
                        showHud(`please select text to copy`);
                    }
                } }) }), children: [jsx(List.SearchBar, { placeholder: "Search a color in any format you want", value: searchText, onChange: setSearchText }), listitems] }));
}

export { TemplateView as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGUtdmlldy5qcyIsInNvdXJjZXMiOltdLCJzb3VyY2VzQ29udGVudCI6W10sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==
