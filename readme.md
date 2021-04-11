# react-devicons

React components for the svg icons of the [devicon](https://github.com/devicons/devicon) project.

## Installation

```js
yarn add react-devicons
// OR
npm install --save react-devicons
```

## Usage

```tsx
import { GithubOriginalIcon, GithubOriginalWordmarkIcon } from "react-devicons";
// OR
import ReactOriginalIcon from "react-devicons/react/original";

<GithubOriginalWordmarkIcon />
<GithubOriginalIcon size="2em" />
<ReactOriginalIcon className="my-class" />
```

### With color

Icons that are only one color can be recolored like this

```tsx
import { DeviconPlainIcon } from "react-devicons";

<DeviconPlainIcon color="white" />;
```
