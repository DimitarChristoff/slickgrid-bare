# SlickGrid Bare 

[![npm version](https://img.shields.io/npm/v/slickgrid-bare.svg?style=flat-square)](https://www.npmjs.com/package/slickgrid-bare) [![npm downloads](https://img.shields.io/npm/dm/slickgrid-bare.svg?style=flat-square)](https://www.npmjs.com/package/slickgrid-bare) ![gzip size](http://img.badgesize.io/https://npmcdn.com/slickgrid-bare/dist/slick.min.js?compression=gzip)

This is a stripped down version of [slickgrid-es6](https://github.com/DimitarChristoff/slickgrid-es6) but with previously FrozenGrid exported as Grid ([X-SlickGrid](https://github.com/ddomingues/X-SlickGrid)) 

It does not have any default plugins, editors, cell renderers that you normally find in other SlickGrid forks.
It has no jQuery-UI (uses customised version of Interact.js instead).
 
## Install

Simply:
```shell script
$ npm i slickgrid-bare --save
$ yarn add slickgrid-bare
```
There's a peerDependency on jQuery 2.2+ that you have to provide yourself, works with that or 3+
 
## Use

```js
import {Data, Grid, Slick} from 'slickgrid-bare';

const data = new Data.DataView([{...}, {...}]);
const columns = [{...}];
const options = {
  rowHeight: 30,
  editable: false,
  enableAddRow: false,
  enableColumnResize: true,
  enableColumnReorder: true,
  frozenColumn: 1,
  enableCellNavigation: true,
  asyncEditorLoading: false,
  enableAsyncPostRender: true,
  asyncPostRenderDelay: 1,
  enableAsyncPostRenderCleanup: true,
  autoEdit: false,
  showHeaderRow: false,
  headerRowHeight: 28,
  enableTextSelectionOnCells: true,
  forceFitColumns: true,
  fullWidthRows: true,
  explicitInitialization: true
};
const grid = new Grid(document.getElementById('grid-container'), data, columns, options);

grid.onColumnsReordered.subscribe(() => {
  const foo = new Slick.Event();
  foo.notify(grid.getColumns())
});

grid.init();
```

This package does not come with a built CSS version, you get SCSS export only. Ideally, copy the files locally and fix 
but some defaults are available. 

```scss
@import '~slickgrid-bare/dist/slick.grid.variables.scss';

$grid-border-color: #f2f2f2;
$grid-border-style: solid;

$grid-header-background: white;

$grid-cell-color: white;
$grid-cell-selected-color: darken($grid-cell-color, 5%);

$cell-padding-top: 9px;
$cell-padding-bottom: 9px;
$cell-padding-right: 10px;
$cell-padding-left: 10px;

@import '~slickgrid-bare/dist/slick.grid.scss';
// more here.
```
