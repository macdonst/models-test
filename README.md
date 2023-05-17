# models-test

## How to reproduce this repo

If you run the command:

```bash
npx @enhance/cli@latest new project-name
cd project-name
```

Then if you copy the `address.schema.json` and `customer.json.schema` files into `project-name` folder.

Before running the following commands open the `customer.schema.json` and edit the paths to the address schema. There is a bug with the schema dereferencer I need to dig into.

Then you can then run.

```bash
npx enhance gen scaffold -f address.schema.json
npx enhance gen scaffold -f customer.schema.json
```
