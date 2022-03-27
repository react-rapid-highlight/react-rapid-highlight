# react-rapid-highlight

Light and fast code highlight component for React applications

- [highlight.js](https://www.npmjs.com/package/highlight.js) is used for code highlighting
- [react-virtualized](https://www.npmjs.com/package/react-virtualized) is used to provide fast scrolling for large files.

## Usage

Import the Highlight component:

``import { Highlight } from 'react-rapid-highlight'``

Render the component:

``<Highlight language='python' text='print('Hello World!')' fontSize={14} rowHeight={30} /> ``

----------------------------------------------------------------------------------------------

The following ``props`` can be passed to the ``Highlight`` component:

- ``language``: The language you want to highlight. A list of options can be found at: [highlight.js supported languages](https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md)
- ``text``: The code you want to highlight. This library is suited for highlighting large blocks of code, as it applies react-virtualized to highlight and render only the visible parts of the code.
- ``fontSize [Optional]``: The font size of your highlighted code.
- ``rowHeight [Optional]``: The height of each line of highlighted code.
