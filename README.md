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

### Debug vite project from IntelliJ/WebStorm

You can debug vite projects simply from Chrome, vite makes the original TypeScript code available via source maps. 
Also install React Developer Tools in Chrome!

It's worth later to investigate how debug can be done directly from IntelliJ. 
- if you run the vite project by creating an npm configuration (see package.json for the proper script!) you can debug the vite runtime only!

Plugins for IntelliJ:
- [Vite Integration plugin](https://github.com/rxliuli/liuli-tools/tree/master/jetbrains-plugins/vite-jetbrains-plugin) for JetBrains IDEs are only support scaffolding projects at the moment 

### Issue: IntelliJ cannot find node.js and yarn

When using corepack in Node v16+, follow these steps:

In Preferences / Languages & Features / Node.js:
- set Node interpreter to the installed Node under nvm directory
- create a symlink for yarn or wait for the [Jetbrains fix](https://youtrack.jetbrains.com/issue/WEB-52682)

## Writing React code in TypeScript

- TypeScript grants compile time type checking while PropTypes is for runtime type checking in React

### Component properties

- To use destructured properties ({tile, color} instead of one props parameter/attribute) in TypeScript:
  - inline declaration: `const Header = ({title, color}: {title: string, color: string}) => {...`
  - define interface: `const Header = ({title, color}: HeaderProps) => {...`
- use ? operator to define optional properties
- use proper event handler types (see later in Event Handling!)

Example:

```typescript
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
  - interface names can easily interfere with component names (Task component with Task model interface)  
    - idea #1: add purpose of the interface instead of prefixing everything with 'I' (ITask is bad, TaskModel is good)
    - idea #2: use Impl postfix for implementations => this won't work for components!
  - no cross-import is supported in TS, best practice: keep them in models.tsx or models/ directory
- declare state variables in App.tsx (declare global state objects) -> redux will do this differently
  - `const tasks: Tasks[] = useState<Task[]>({defaultState...})` (useState with generics!)

### Handling events

- if you want to access element-specific data in event handler code
  - declare events in component props with proper type (e.g. `MouseEventHandler<SVGElement>`)
- otherwise, you can use EventHandler<T> by providing a parent type in generic as a type: `EventHandler<any>`
  - note: `any` would irritate the linter, however React use any in the definition of EventHandler as well

### Fetching data from server

- axios library supports [exception handling out of the box](https://blog.bitsrc.io/performing-http-requests-fetch-vs-axios-b62b44fed10d#:~:text=Key%20Differences%3A,to%20a%20String%20(Stringified).), while fetch() only rejects the promise
- add ...Async postfix to functions which are declared with the async keyword
  - call them with .then() from sync methods
- useEffect might end in [infinite loop](https://dmitripavlutin.com/react-useeffect-infinite-loop/)
  - due to that useEffect is scheduled after _every_ DOM changes (and DOM changes are triggered by observables change). 
    - in the async function always check whether data has been loaded earlier
    - provide dependency or dependencies as a second parameter for useEffect

```typescript
    const [tasks, setTasks] = useState<TaskModel[]>([]);
    
    const fetchTasksAsync = async () => {
      try {
        const url = new URL(API_URL + '/tasks');
        const resp = await axios.get(url.toString());
        setTasks(resp.data);
      } catch (ex) {
        console.error(ex);
      }
    }

    useEffect(() => {
        if (tasks.length === 0) fetchTasksAsync().then();
    }, [tasks])
```

## Running locally and testing

### Fake REST API server

Fake REST API server to develop and test frontend code:

- Install [json-server](https://github.com/typicode/json-server) package as a dev depency: `yarn add --dev json-server`
- Add a new run script to package json: `"mock-backend": "json-server --watch db.json --port 5000"`

`yarn mock-backend` starts the mock BE server. The endpoints and responses is described in db.json.
See the json-server GitHub page for the documentation! 

## Materials

- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [TypeScript / Object Types](https://www.typescriptlang.org/docs/handbook/2/objects.html#property-modifiers)
- [IntelliJ / React](https://www.jetbrains.com/help/idea/react.html)
- [JSON server - fake REST API](https://github.com/typicode/json-server)