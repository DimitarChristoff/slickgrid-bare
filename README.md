# SlickGrid Bare

[![npm version](https://img.shields.io/npm/v/slickgrid-bare.svg?style=flat-square)](https://www.npmjs.com/package/slickgrid-bare) [![npm downloads](https://img.shields.io/npm/dm/slickgrid-bare.svg?style=flat-square)](https://www.npmjs.com/package/slickgrid-bare) ![gzip size](http://img.badgesize.io/https://npmcdn.com/slickgrid-bare/dist/slick.min.js?compression=gzip)

This is a stripped down version of [slickgrid-es6](https://github.com/DimitarChristoff/slickgrid-es6) 

It does not have any default plugins, editors, cell renderers that you normally find in other SlickGrid forks.
It has no jQuery-UI (uses customised version of Interact.js instead).

## Install

Simply (with jquery peer dep):

```shell script
$ npm i slickgrid-bare jquery --save
$ yarn add slickgrid-bare jquery
```

The peerDependency on jQuery is v2.2+ that you have to provide yourself (which is deemed insecure), works with that or v3+

## Use (full bundle)

```js
import {Data, Grid, Slick} from 'slickgrid-bare';

const data = new Data.DataView([{...}, {...}]);
const columns = [{
  id: 'name',
  resizable: true,
  name: 'Name',
  field: 'name',
  cssClass: 'is-text',
  minWidth: 60,
  maxWidth: 200,
  sortable: true,
  sortComparer: (a, b) => a > b ? -1 : 0,
  formatter: (row, column, value) => `<div>${value}</div>`
}];
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

Optimised use for build sizes in module imports:

```js
import Grid from 'slickgrid-bare/dist/6pac';
import FrozenGrid from 'slickgrid-bare/dist/frozen';
import Data from 'slickgrid-bare/dist/data';
import Core from 'slickgrid-bare/dist/core';
```

*WARNING:* This package does not come with a compiled CSS version, you get .SCSS export only. Ideally, copy the files locally and fix
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
