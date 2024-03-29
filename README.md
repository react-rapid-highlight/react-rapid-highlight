### About

Light and fast code highlight component for React applications

- [react-syntax-highlighter](https://react-syntax-highlighter.github.io/react-syntax-highlighter/) is used for code highlighting
- [react-virtualized](https://www.npmjs.com/package/react-virtualized) is used to provide fast scrolling for large files.

### Usage

Import the Highlight component:

``import { Highlight } from 'react-rapid-highlight'``

Render the component:

``<Highlight language="python" text="print(\'Hello World!\')" fontSize={12} lineHeight={0.75} rowHeight={30} theme="vsc-dark-plus" /> ``

----------------------------------------------------------------------------------------------

The following ``props`` can be passed to the ``Highlight`` component:

- ``language``: The language you want to highlight. A list of supported options can be found at: [https://react-syntax-highlighter.github.io/react-syntax-highlighter/demo/prism.html](https://react-syntax-highlighter.github.io/react-syntax-highlighter/demo/prism.html).
- ``text``: The code you want to highlight. This library is suited for highlighting large blocks of code, as it applies react-virtualized to highlight and render only the visible parts of the code. *It must be stored in a React state*.
- ``fontSize [Optional]``: The font size of your highlighted code.
- ``lineHeight [Optional]``: The line height of your highlighted code.
- ``rowHeight [Optional]``: The height of each line of highlighted code.
- ``theme [Optional]``: The theme style of the highlighted code. A list of supported options can be found at: [https://react-syntax-highlighter.github.io/react-syntax-highlighter/demo/prism.html](https://react-syntax-highlighter.github.io/react-syntax-highlighter/demo/prism.html).