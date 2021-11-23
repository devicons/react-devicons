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
import ReactOriginalIcon from "react-devicons/react/original";
// or (not recommended, this would increase bundle size by a lot)
import { GithubOriginalIcon, GithubOriginalWordmarkIcon } from "react-devicons";

<GithubOriginalWordmarkIcon />
<GithubOriginalIcon size="2em" />
<ReactOriginalIcon className="my-class" />
```

### With color

Icons that are only one color can be recolored like this

```tsx
import DeviconPlainIcon from "react-devicons/devicon/plain";

<DeviconPlainIcon color="white" />;
```
