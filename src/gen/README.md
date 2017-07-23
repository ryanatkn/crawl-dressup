# gen

## Usage
```bash
npm run gen
```

## What is gen?

dbslate takes a nontraditional approach to writing and maintaining much of its code.
Rather than writing all code by hand directly in source files,
dbslate takes a plain JSON schema
(see [`/src/_userProject/defs/app.def.json`](/src/_userProject/defs/app.def.json)),
and outputs source code across the whole web stack in multiple languages.
The tradeoffs include a clearly worse code reading/writing/debugging experience,
at least at first glance, but we believe defining most of an app as plain JSON
is an experiment worth trying, particularly because of its tool-assistability.

`Writers` generate code from data,
outputting code in whatever language they want,
and they construct this code using TypeScript and a lot of strings.
See [`/src/gen`](/src/gen/README.md)
and [`/src/tasks/gen.ts`](/src/tasks/gen.ts) for more.
The generation process is a pure reducer applying a bunch of writers
to some output file state, files whose contents are written by the writers.

> TypeScript doesn't have to be a hard dependency,
> but it's the language we currently prefer for web development.

The dbslate code gen is not backed by any theory or deep understanding,
but it feels like a fertile direction to explore.
Expect a lot of churn here.
Worse case scenario, dbslate's code gen ends up being a waste of time,
but in that case we'll still have dbslate the hopefully useful _product_,
even if dbslate the _process_ is considered a failure.

## todo
- model BaseAction better instead of simply being optional
- `renderDefaultValue` patterned after `renderRandomValue`
- enable generating lazy value resolution when possible (see mockAction)
- generate per-field mock/default functions
- look into modeling state/variants as type unions
- mock str with params (instead of hardcoded)