# SlickGrid

[![npm version](https://img.shields.io/npm/v/slickgrid-bare.svg?style=flat-square)](https://www.npmjs.com/package/slickgrid-bare) [![npm downloads](https://img.shields.io/npm/dm/slickgrid-bare.svg?style=flat-square)](https://www.npmjs.com/package/slickgrid-bare) ![gzip size](http://img.badgesize.io/https://npmcdn.com/slickgrid-bare/dist/slickgrid.js?compression=gzip)

This is a stripped down version of [slickgrid-es6](https://github.com/DimitarChristoff/slickgrid-es6). It has been customised to
support the needs of the IA Portal app alone and a portion of its styles lives in the @gin/ia-components repo.

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

_WARNING:_ This package does not come with a compiled CSS version, you get .SCSS export only. Ideally, copy the files locally and fix
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

// main
@import 'slickgrid-bare';
// more here.
```

# Changes compared to original forks

The original slickgrid-es6 repo was created to drop jquery-ui as a dependency and to compile via normal modules and requires.
Meanwhile, as the main slickgrid project is dead, there were two viable candidates for a repo to fork for the conversion -
[6pac fork](https://github.com/6pac/SlickGrid/) and [X-SlickGrid](https://github.com/ddomingues/X-SlickGrid). They are both
quite diverged and have gone into different directions.

Had to do a bunch of changes and bug fixes, which meant we had to fork slickgrid-es6, and continue to
support the 2 grids it exported. We reference them as 6pac (`import Grid from 'slickgrid-bare/dist/6pac';`) or Frozen
(`import FrozenGrid from 'slickgrid-bare/dist/frozen';`), but also `import {Grid, GrozenGrid} from 'slickgrid-bare'` -
the general gist is, 6pac has more features and bug fixes but does not support Frozen Rows / Columns. If you need a
grid w/o frozen columns, I'd suggest importing the 6pac grid unless you already use the Frozen one and want to
keep the build size smaller. Notably, the two implementations have slightly different styling options and also, sometimes
different events coming through, with unwrapped DOM events vs jQuery - but are at least 95%+ compatible with each other
over a relatively basic configuration.

## Known Issues

- The Interact.js dependency is built in now, because of a monkey patch on an originalEvent prop being passed on to
  slickgrid, which was needed to replace jquery-ui and support drag reorder and column resize
- There are issues with scrollbar size detection in Frozen, which may be something to patch as the 6pac SlickGrid does have a
  method to detect scrollbar size. It may be a relatively trivial thing to do but since build target is mostly chrome and
  scrollbar sizes is controlled via CSS, this was not required.
