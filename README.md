# Task Tracker Tutorial in TS w/ Redux 
Doing the [React Task Tracker tutorial](https://www.youtube.com/watch?v=w7ejDZ8SWv8) in TypeScript and adding Redux.

## Pre-requisites

Install [nvm](https://github.com/nvm-sh/nvm):

`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash`

Install nodejs v16+ with nvm:

`nvm install 16.13.2`

Enable corepack and install yarn:

```
corepack enable
corepack prepare yarn@1.22.17 --activate
```

## Setup a new project

### Create a new vite project

Execute `yarn create vite` and select react, react_ts template.

### Issue: IntelliJ cannot find node.js and yarn

When using corepack in Node v16+, follow these steps:

In Preferences / Languages & Features / Node.js:
- set Node interpreter to the installed Node under nvm directory
- create a symlink for yarn or wait for the [Jetbrains fix](https://youtrack.jetbrains.com/issue/WEB-52682)

## Writing React code in TypeScript

- TypeScript grants compile time type checking while PropTypes is for runtime type checking in React

### Component properties

- To use destructured properties ({tile, color} instead of props) in TypeScript:
  - inline declaration: `const Header = ({title, color}: {title: string, color: string}) => {...`
  - define interface: `const Header = ({title, color}: HeaderProps) => {...`
- use ? operator to define optional properties
- use proper event handler types

Example:

```
interface Props {
    color?: string;
    text?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ color, text, onClick }: Props) => {
    return (
        <button
            style={{ backgroundColor: color }}
            className='btn'
            onClick={onClick}
        >
            {text ?? 'Button'}
        </button>
    )
}
```

### Component state

- declare models and DTOs as interfaces (we don't need them transpiled as js classes)
  - no cross-import is supported in TS, best practice: keep them in models.tsx or models/ directory
- declare state variables in App.tsx (declare global state objects) -> redux will do this differently
  - `const tasks: Tasks[] = useState<Task[]>({defaultState...})` (useState with generics!)